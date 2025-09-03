import { ApiError } from "../utils/ApiError.js"
import { ApiResponce } from "../utils/ApiResponce.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { BookChunk } from "../models/chunk.model.js";
import { JSDOM } from "jsdom";
import callGeminiAPI from "../utils/CallGemini.js"


const chat = asyncHandler(async (req, res) => {
    try {
        const userQuestion = req.body.question;
        if (!userQuestion) {
            return res.status(400).json({ message: 'Question is required.' });
        }

        const allChunks = await BookChunk.find({}).sort({ chunkId: 1 });
        if (allChunks.length === 0) {
            return res.status(404).json({ message: 'No book data ingested yet. Please ingest the book first.' });
        }

        const retrievalPrompt = `Given the following text chunks from a book, identify minimum 3 most relevant chunks that can help answer the question: "${userQuestion}".
            Return only the exact text of the identified chunks, one per line, enclosed in <chunk> and </chunk> tags.
            If no chunks are relevant, state "No relevant information found."

            Available Chunks:
            ${allChunks.map(chunk => `<chunk_id>${chunk.chunkId}</chunk_id>\n${chunk.content}`).join('\n\n')}
            `;

        const retrievedChunksRaw = await callGeminiAPI(retrievalPrompt);
        let relevantChunksContent = [];
        let sourcesUsed = [];

        if (retrievedChunksRaw && retrievedChunksRaw.includes('<chunk>')) {
            const dom = new JSDOM(`<root>${retrievedChunksRaw}</root>`, { contentType: 'application/xml' });
            const doc = dom.window.document;
            const chunkElements = doc.querySelectorAll('chunk');

            chunkElements.forEach(chunkElement => {
                let chunkContent = chunkElement.textContent.trim();
                chunkContent = chunkContent.replace(/<chunk_id>\d+<\/chunk_id>\s*/g, '').trim();
                if (chunkContent) {
                    relevantChunksContent.push(chunkContent);
                    sourcesUsed.push(chunkContent); 
                }
            });
        }

        if (relevantChunksContent.length === 0 || retrievedChunksRaw.includes("No relevant information found.")) {
            return res.status(200).json(new ApiResponce(200, {
                answer: "I couldn't find enough relevant information in the book to answer that question.",
                sources: []
            }));
        }

        // ✔️ MODIFIED PROMPT: Removed the specific book title to make it generic.
        const generationPrompt = `You are a helpful assistant. Your goal is to answer questions based ONLY on the provided context from a book.
            Do not use any external knowledge. If the answer is not present in the context, state that you cannot answer from the provided information.

            Context:
            ${relevantChunksContent.map((chunk, index) => `[Source ${index + 1}] ${chunk}`).join('\n\n')}

            Question: "${userQuestion}"

            Answer:`;

        const finalAnswer = await callGeminiAPI(generationPrompt);

        const data = {
            answer: finalAnswer,
            sources: sourcesUsed
        }
        console.log(data)
        return res.status(200).json(new ApiResponce(200, data));

    } catch (error) {
        console.error('Error in chat endpoint:', error);
        return res.status(500).json(new ApiError(500, "cannot go through with your request", error));
    }
})

export {
    chat
}
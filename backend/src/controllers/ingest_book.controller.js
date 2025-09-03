import { BookChunk } from "../models/chunk.model.js"; 
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { text } from "../../public/book_text.js";
import pdf from "pdf-parse"

function splitTextIntoChunks(text, chunkSize, chunkOverlap) {
    const chunks = [];
    const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
    let currentChunk = '';
    let currentChunkId = 0;

    for (const sentence of sentences) {
        if ((currentChunk + sentence).length <= chunkSize) {
            currentChunk += sentence;
        } else {
            chunks.push({ content: currentChunk.trim(), chunkId: currentChunkId++ });
            const overlapStart = Math.max(0, currentChunk.length - chunkOverlap);
            currentChunk = currentChunk.substring(overlapStart) + sentence;
        }
    }
    if (currentChunk) {
        chunks.push({ content: currentChunk.trim(), chunkId: currentChunkId++ });
    }
    return chunks;
}
function getFileExtension(mimeType) {
    if (typeof mimeType !== 'string' || !mimeType.includes('/')) {
      return null;
    }
    return mimeType.split('/')[1];
  }


const ingest_book = asyncHandler(async (req, res) => {
    try {
        const book = req.file; // Use provided text or default
        if (!book) {
            return res.status(400).json(new ApiResponce(400, null, "No file uploaded."));
        }
        const extention = getFileExtension(req.file.mimetype);
        
        if (extention !== "pdf") {
            return res.status(400)
                .json(new ApiResponce(400, {}, "uploaded file is not a PDF file"));
        }

        const dataBuffer = req.file.buffer;
        console.log(req.file)
        let bookText = null;
        await pdf(dataBuffer)
        .then((data)=>{
            bookText = data.text
        })

        const CHUNK_SIZE = 500;
        const CHUNK_OVERLAP = 100;

        const chunks = splitTextIntoChunks(bookText.trim(), CHUNK_SIZE, CHUNK_OVERLAP);

        await BookChunk.deleteMany({}); 
        await BookChunk.insertMany(chunks);

        console.log(`Successfully ingested and stored ${chunks.length} chunks.`);
        return res.status(200).json(new ApiResponce(200, { chunkCount: chunks.length }, "book ingested successfully"));

    } catch (error) {
        console.error('Error ingesting book:', error);
        return res.status(500).json(new ApiError(500, "failed to ingest book", error));
    }
})

export {
    ingest_book
}
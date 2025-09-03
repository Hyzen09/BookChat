import {ApiError} from "../utils/ApiError.js"
import { ApiResponce } from "../utils/ApiResponce.js"
import {asyncHandler} from "../utils/AsyncHandler.js"
import callGeminiAPI from "../utils/CallGemini.js"
const suggest_question = asyncHandler(async (req, res) => {
    try {
        const { lastAnswer } = req.body;
        if (!lastAnswer) {
            return res.status(400).json({ message: 'Last answer is required for suggestions.' });
        }

        const prompt = `Given the following answer from a chatbot answering questions about a book, suggest 2-4 concise follow-up questions pf which yo can answer easily from the data Return them as a numbered list.
        Answer: "${lastAnswer}" Follow-up Questions:`;

        const suggestionsRaw = await callGeminiAPI(prompt);
        const suggestions = suggestionsRaw.split('\n').filter(line => line.match(/^\d+\./)).map(line => line.replace(/^\d+\.\s*/, '').trim());

        res.status(200).json({ suggestions });
        return res.status(200).json(new ApiResponce(200,{suggestions},"successfully sugested questions"))
    } catch (error) {
        console.error('something went wrong while suggesting question', error);
        return res.status(500).json(new ApiError(500, "faild to suggest question", error));
    }
})

export {
    suggest_question
    }
    
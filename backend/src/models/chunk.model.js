import mongoose, {Schema} from "mongoose";

const ChunkSchema = new mongoose.Schema({
    content: { type: String, required: true },
    chunkId: { type: Number, required: true, unique: true }
});

export const BookChunk = mongoose.model('BookChunk', ChunkSchema);
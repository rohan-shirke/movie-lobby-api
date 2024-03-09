import mongoose, { Document, Schema } from 'mongoose';

export interface MovieModel extends Document {
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
}

const movieSchema = new Schema<MovieModel>({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    streamingLink: { type: String, required: true }
});

export default mongoose.model<MovieModel>('Movie', movieSchema);
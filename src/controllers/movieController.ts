import { Request, Response } from 'express';
import Movie from '../models/Movie';

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const searchMovies = async (req: Request, res: Response) => {
    const query = req.query.q as string;
    try {
        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addMovie = async (req: Request, res: Response) => {
    try {
        const { title, genre, rating, streamingLink } = req.body;
        const newMovie = new Movie({ title, genre, rating, streamingLink });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedMovie) {
            res.json(updatedMovie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (deletedMovie) {
            res.json({ message: 'Movie deleted successfully' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

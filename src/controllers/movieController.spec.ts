import express from 'express';
const appExpress = express();
import request from 'supertest';
import mongoose from 'mongoose';
const app = appExpress;
import Movie from '../models/Movie';

jest.mock('../models/Movie');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/movie_test_db', );
});

afterEach(async () => {
  await Movie.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/movies', () => {
  it('should return all movies', async () => {
    const movies = [
      { title: 'Movie 1', genre: 'Action', rating: 8.5, streamingLink: 'https://example.com/movie1' },
      { title: 'Movie 2', genre: 'Comedy', rating: 7.9, streamingLink: 'https://example.com/movie2' },
    ];

    await Movie.create(movies);

    const res = await request(app).get('/api/movies');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(movies);
  });
});

describe('GET /api/search', () => {
  it('should return movies matching the search query', async () => {
    const movies = [
      { title: 'Movie 1', genre: 'Action', rating: 8.5, streamingLink: 'https://example.com/movie1' },
      { title: 'Movie 2', genre: 'Comedy', rating: 7.9, streamingLink: 'https://example.com/movie2' },
    ];

    await Movie.create(movies);

    const res = await request(app).get('/api/search?q=Action');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Movie 1');
  });
});

describe('POST /api/movies', () => {
  it('should add a new movie', async () => {
    const newMovie = {
      title: 'New Movie',
      genre: 'Drama',
      rating: 9.0,
      streamingLink: 'https://example.com/newmovie'
    };

    const res = await request(app)
      .post('/api/movies')
      .send(newMovie);

    expect(res.status).toBe(201);

    const movie = await Movie.findOne({ title: 'New Movie' });
    expect(movie).toBeTruthy();
  });
});

describe('PUT /api/movies/:id', () => {
  it('should update an existing movie', async () => {
    const existingMovie = await Movie.create({
      title: 'Existing Movie',
      genre: 'Action',
      rating: 7.5,
      streamingLink: 'https://example.com/existingmovie'
    });

    const updatedData = {
      genre: 'Drama',
      rating: 8.0,
    };

    const res = await request(app)
      .put(`/api/movies/${existingMovie._id}`)
      .send(updatedData);

    expect(res.status).toBe(200);

    const updatedMovie = await Movie.findById(existingMovie._id);
    expect(updatedMovie).toBeTruthy();
    expect(updatedMovie?.genre).toBe('Drama');
    expect(updatedMovie?.rating).toBe(8.0);
  });
});

describe('DELETE /api/movies/:id', () => {
  it('should delete an existing movie', async () => {
    const existingMovie = await Movie.create({
      title: 'Existing Movie',
      genre: 'Action',
      rating: 7.5,
      streamingLink: 'https://example.com/existingmovie'
    });

    const res = await request(app).delete(`/api/movies/${existingMovie._id}`);

    expect(res.status).toBe(200);

    const deletedMovie = await Movie.findById(existingMovie._id);
    expect(deletedMovie).toBeNull();
  });
});

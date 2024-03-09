import { Router } from 'express';
import { addCacheHeaders, cacheControllerMiddleware } from './middleware/cacheMiddleware';
import * as movieController from './controllers/movieController';

const router = Router();

router.get('/movies', addCacheHeaders, movieController.getAllMovies);
router.get('/search', addCacheHeaders, movieController.searchMovies);

router.use(cacheControllerMiddleware);

router.post('/movies', movieController.addMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

export default router;

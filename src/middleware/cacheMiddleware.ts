import { Request, Response, NextFunction } from 'express';
import cacheController from 'express-cache-controller';


export const addCacheHeaders = (req: Request, res: Response, next: NextFunction) => {
    res.header('Cache-Control', 'public, max-age=3600'); //  1 hour response
    next();
};

export const cacheControllerMiddleware = cacheController();
import { Router } from 'express';
import { blogsRouter } from './Blogs';

const router = Router();

router.use('/blogs', blogsRouter);

export { router as apiRouter };
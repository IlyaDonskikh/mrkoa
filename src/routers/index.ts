import * as Router from 'koa-router';
import apiRoutes from './api/index.router';

const router = new Router();

// Api V1
router.use('/api', apiRoutes);

// Export
export default router;

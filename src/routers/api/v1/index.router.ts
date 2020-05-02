import * as Router from 'koa-router';
import panelRoutes from './panel/index.router';
import authRoutes from './auth/index.router';

const router = new Router();

// Auth
router.use('/auth', authRoutes);

// Panel
router.use('/panel', panelRoutes);

// Export
export default router.routes();

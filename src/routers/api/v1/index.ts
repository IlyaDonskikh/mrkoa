import * as Router from 'koa-router';
import panelRoutes from './panel/index';

const router = new Router();

// Devices
router.use('/panel', panelRoutes);

// Export
export default router.routes();

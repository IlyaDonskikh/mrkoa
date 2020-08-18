import * as Router from 'koa-router';
import sessionsRoutes from './sessions.router';

const router = new Router();

// Users
router.use('', sessionsRoutes);

// Export
export default router.routes();

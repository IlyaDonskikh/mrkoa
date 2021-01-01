import * as Router from 'koa-router';
import { authSessionsRoutes } from './sessions.router';

const router = new Router();

// Users
router.use('', authSessionsRoutes);

// Export
export const authRoutes = router.routes();

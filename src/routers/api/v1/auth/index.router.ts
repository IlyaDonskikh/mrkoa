import * as Router from 'koa-router';
import usersRoutes from './users.router';

const router = new Router();

// Users
router.use('', usersRoutes);

// Export
export default router.routes();

import * as Router from 'koa-router';
import usersRoutes from './users.router';
import { authRouterHelper } from '../../../helpers/auth.router.helper';

const router = new Router();

// Auth
router.use('/', authRouterHelper);

// Devices
router.use('/users', usersRoutes);

// Export
export default router.routes();

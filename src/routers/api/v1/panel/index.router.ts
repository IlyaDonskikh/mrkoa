import * as Router from 'koa-router';
import { panelUsersRoutes } from './users.router';
import { authRouterHelper } from '../../../helpers/auth.router.helper';

const router = new Router();

// Auth
router.use('/', authRouterHelper);

// Devices
router.use('/users', panelUsersRoutes);

// Export
export const panelRoutes = router.routes();

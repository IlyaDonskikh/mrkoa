import * as Router from 'koa-router';
import { apiRoutes } from './api/index.router';
import { errorsRouterHelper } from '../helpers/routers/errors.router.helper';

const router = new Router();

// Api V1
router.use('/', errorsRouterHelper);
router.use('/api', apiRoutes);

// Export
export { router };

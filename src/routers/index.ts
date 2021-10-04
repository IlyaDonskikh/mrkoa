import Router from 'koa-router';
import { apiRoutes } from './api/index.router';
import { errorsRouterHelper } from '../helpers/routers/errors.router.helper';

const router = new Router();

router.use('/', errorsRouterHelper); // errors middleware

// Api
router.use('/api', apiRoutes);

// Export
export { router };

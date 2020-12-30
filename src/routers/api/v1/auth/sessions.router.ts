import * as Router from 'koa-router';
import * as users from '../../../../controllers/api/v1/auth/sessions.controller';
import { authRouterHelper } from '../../../helpers/auth.router.helper';

const router = new Router();

// Users
router.post('/sign_in', users.create);

// Sign Out
router.use('/sign_out', authRouterHelper);
router.delete('/sign_out', users.destroy);

// Export
export default router.routes();

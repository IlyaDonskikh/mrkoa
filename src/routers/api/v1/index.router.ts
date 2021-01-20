import * as Router from 'koa-router';
import * as sessions from '../../../controllers/api/v1/auth/sessions.controller';
import * as users from '../../../controllers/api/v1/panel/users.controller';
import { authRouterHelper } from '../../helpers/auth.router.helper';

const router = new Router();

//! Auth

// Sessions
router.post('/auth/sign_in', sessions.create);
router.use('/auth/sign_out', authRouterHelper);
router.delete('/auth/sign_out', sessions.destroy);

//! Panel

router.use('/panel', authRouterHelper);

// Users
router.get('/panel/users', users.index);
router.post('/panel/users', users.create);

// Export
export const v1Routes = router.routes();

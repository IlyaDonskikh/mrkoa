import * as Router from 'koa-router';
import * as authSessions from '../../../controllers/api/v1/auth/sessions.controller';
import * as panelUsers from '../../../controllers/api/v1/panel/users.controller';
import { authRouterHelper } from '../../helpers/auth.router.helper';

const router = new Router();

// AUTH

// Sessions
router.post('/auth/sign_in', authSessions.create);
router.use('/auth/sign_out', authRouterHelper);
router.delete('/auth/sign_out', authSessions.destroy);

// PANEL
router.use('/panel', authRouterHelper);

// Users
router.get('/panel/users', panelUsers.index);
router.post('/panel/users', panelUsers.create);

// Export
export const v1Routes = router.routes();

import * as Router from 'koa-router';
import {
  create as authSessionsCreate,
  destroy as authSessionsDestroy,
} from '../../../controllers/api/v1/auth/sessions.controller';
import {
  index as panelUsersIndex,
  create as panelUsersCreate,
} from '../../../controllers/api/v1/panel/users.controller';
import { authRouterHelper } from '../../../helpers/routers/auth.router.helper';

const router = new Router();

// AUTH

// Sessions
router.post('/auth/sign_in', authSessionsCreate);
router.use('/auth/sign_out', authRouterHelper);
router.delete('/auth/sign_out', authSessionsDestroy);

// PANEL
router.use('/panel', authRouterHelper); // access to panel only for authorized persons

// Users
router.get('/panel/users', panelUsersIndex);
router.post('/panel/users', panelUsersCreate);

// Export
export const v1Routes = router.routes();

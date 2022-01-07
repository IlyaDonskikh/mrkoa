import Router from 'koa-router';
import { create as authSessionsCreate } from '../../../controllers/api/v1/auth/sessions.controller';
import { destroy as panelSessionsDestroy } from '../../../controllers/api/v1/panel/sessions.controller';
import {
  index as panelUsersIndex,
  create as panelUsersCreate,
} from '../../../controllers/api/v1/panel/users.controller';
import { authRouterHelper } from '../../../helpers/routers/auth.router.helper';

const router = new Router();

// AUTH

// Sessions
router.post('/auth/sessions', authSessionsCreate);

// PANEL
router.use('/panel', authRouterHelper); // access to panel only for authorized persons

// Sessions
router.delete('/panel/sessions', panelSessionsDestroy);

// Users
router.get('/panel/users', panelUsersIndex);
router.post('/panel/users', panelUsersCreate);

// Export
export const v1Routes = router.routes();

import * as Router from 'koa-router';
import * as users from '../../../../controllers/api/v1/panel/users.controller';

const router = new Router();

// Users
router.get('/', users.index);
router.post('/', users.create);

// Export
export default router.routes();

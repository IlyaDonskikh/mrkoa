import * as Router from 'koa-router';
import * as events from '../../../../controllers/api/v1/panel/devices';

const router = new Router();

// Devices
router.get('/', events.index);
router.get('/:id', events.show);
router.post('/', events.create);

// Export
export default router.routes();

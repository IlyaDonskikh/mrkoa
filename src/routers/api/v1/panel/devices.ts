import * as Router from 'koa-router';
import * as devices from '../../../../controllers/api/v1/panel/devices';

const router = new Router();

// Devices
router.get('/', devices.index);
router.get('/:id', devices.show);
router.post('/', devices.create);

// Export
export default router.routes();

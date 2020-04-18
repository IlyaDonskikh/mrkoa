import * as Router from 'koa-router';
import * as devices from '../../controllers/devices';

const router = new Router();

// Devices
router.get('/', devices.index);

// Export
export default router.routes();

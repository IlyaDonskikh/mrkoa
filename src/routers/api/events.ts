import * as Router from 'koa-router';
import * as events from '../../controllers/api/v1/events';

const router = new Router();

// Devices
router.get('/events', events.index);

// Export
export default router.routes();

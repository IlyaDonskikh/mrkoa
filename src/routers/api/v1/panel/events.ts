import * as Router from 'koa-router';
import * as events from '../../../../controllers/api/v1/panel/events.controller';

const router = new Router();

// Devices
router.get('/events', events.index);
router.get('/events', events.show);

// Export
export default router.routes();

import * as Router from 'koa-router';
import devicesRoutes from './devices';
import eventsRoutes from './events';

const router = new Router();

// Devices
router.use('/devices', devicesRoutes);

// Events
router.use('/events', eventsRoutes);

// Export
export default router.routes();

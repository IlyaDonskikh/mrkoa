import * as Router from 'koa-router';
import devicesRoutes from './devices.router';
import eventsRoutes from './events.router';
import auth from '../../../helpers/auth.router.helper';

const router = new Router();

// Auth
router.use('/', auth);

// Devices
router.use('/devices', devicesRoutes);

// Events
router.use('/events', eventsRoutes);

// Export
export default router.routes();

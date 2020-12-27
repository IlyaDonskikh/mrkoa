import * as app from '../../src/index';
import { server } from './helpers';

const { db } = app.context;

async function closeServer() {
  server.close();
}

export default closeServer;

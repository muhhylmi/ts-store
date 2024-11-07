import config from '../infrastructure/config';
import apm from 'elastic-apm-node';
apm.start({
  serverUrl: config.ELASTIC_APM_SERVER_URL,
  serviceName: config.ELASTIC_APM_SERVICE_NAME,
  environment: config.NODE_ENV
});
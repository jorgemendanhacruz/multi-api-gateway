import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import Logger from './logger';
import config from '../config/config';

export default async ({ expressApp }) => {
  //const mongoConnection = await mongooseLoader();
  const redisConnection = null; //call here the connection
  Logger.info('✌️ DB loaded and connected!');

  // Schemas
  const weahterSchema = {
    name: 'weatherSchema',
    schema: '../persistence/schemas/weatherSchema',
  };
  
  // Controllers
  const weatherController = {
    name: config.controllers.weather.name,
    path: config.controllers.weather.path,
  };

  // Repositories
  const weatherRepo = {
    name: config.repos.weather.name,
    path: config.repos.weather.path,
  };

  // Services
  const weatherService = {
    name: config.services.weather.name,
    path: config.services.weather.path,
  };

  // Dependency Injector
  dependencyInjectorLoader({
    redisConnection,
    schemas: [
      weahterSchema
    ],
    controllers: [
      weatherController,
    ],
    repos: [
      weatherRepo,
    ],
    services: [
      weatherService,
    ],
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  // Express Loader
  expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};

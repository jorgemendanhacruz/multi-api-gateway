import { Container } from 'typedi';
import LoggerInstance from './logger';

export default ({ redisConnection, externalAPIs, schemas, controllers, repos, services}: {
                    redisConnection;
                    externalAPIs: {name: string; path: string}[];
                    schemas: { name: string; schema: any }[],
                    controllers: {name: string; path: string }[],
                    repos: {name: string; path: string }[],
                    services: {name: string; path: string }[] }) => {
  try {
    Container.set('redis.client', redisConnection);

    Container.set('logger', LoggerInstance);


    externalAPIs.forEach(m => {
      let apiClass = require(m.path).default;
      let apiInstance = Container.get(apiClass);
      Container.set(m.name, apiInstance);
    });

    schemas.forEach(m => {
      // Notice the require syntax and the '.default'
      let schema = require(m.schema).default;
      Container.set(m.name, schema);
    });

    repos.forEach(m => {
      let repoClass = require(m.path).default;
      let repoInstance = Container.get(repoClass);
      Container.set(m.name, repoInstance);
    });

    services.forEach(m => {
      let serviceClass = require(m.path).default;
      let serviceInstance = Container.get(serviceClass)
      Container.set(m.name, serviceInstance);
      });

    controllers.forEach(m => {
      // load the @Service() class by its path
      let controllerClass = require(m.path).default;
      // create/get the instance of the @Service() class
      let controllerInstance = Container.get(controllerClass);
      // rename the instance inside the container
      Container.set(m.name, controllerInstance);
    });

    return;
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};

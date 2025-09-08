import dotenv from 'dotenv';

dotenv.config();

export interface Pair {
  name: string;
  path: string;
}

export interface Logs {
  level: string;
}

export interface Config {
  port: number;
  nodeEnv: string;
  logs: Logs;
  api: {prefix: string};
  redis: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
  weatherApiUrl: string;
  controllers: Record<string, Pair>;
  services: Record<string, Pair>;
  repos: Record<string, Pair>;
}


const config: Config = {
  port: Number(process.env.PORT) || 3000,

  nodeEnv: process.env.NODE_ENV || 'development',

  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  api: {
    prefix: '/api',
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },

  weatherApiUrl: 'https://api.openweathermap.org/data/2.5/weather?',

  controllers: {
    weather: {
      name: "WeatherController",
      path: "../controllers/weatherController",
    },
  },

  services: {
    weather: {
      name: "WeatherService",
      path: "../services/weatherService",
    },
  },

  repos: {
    weather: {
      name: "WeatherRepo",
      path: "../repos/weatherRepo",
    },
  }
};

export default config;
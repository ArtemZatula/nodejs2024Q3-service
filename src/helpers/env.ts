import { config } from 'dotenv';
config();

export const getPort = () => process.env.PORT || 4000;

export const getDbConfigs = () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'postgres',
  synchronize: process.env.TYPEORM_SYNC === 'true',
});

export const getJwtSecret = () => process.env.JWT_SECRET_KEY || 'my_secret';

export const getTokenExpiryTime = () => process.env.TOKEN_EXPIRE_TIME || '1h';

export const getSaltRounds = () => parseInt(process.env.CRYPT_SALT || '10', 10);

export const getRefreshSecret = () =>
  process.env.JWT_SECRET_REFRESH_KEY || 'my_secret';

export const getRefreshExpiryTime = () =>
  process.env.TOKEN_REFRESH_EXPIRE_TIME || '1h';

export const getLogLevel = () => parseInt(process.env.LOG_LEVEL || '1', 1);

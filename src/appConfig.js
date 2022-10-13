import config from 'config';
import path from 'path';

const __dirname = path.resolve();

export default {
  port: config.get('PORT') || process.env.PORT || '',
  availableLocals: config.get('AVAILABLE_LOCALS') || process.env.AVAILABLE_LOCALS || '',
  defaultLanguage: config.get('DEFAULT_LANGUAGE') || process.env.DEFAULT_LANGUAGE || '',
  projectRoot: path.join(__dirname, '.'),
  algorithm: 'aes-256-cbc',
  sessionSecret: config.get('SESSION_SECRET') || process.env.SESSION_SECRET || '',
  encryptionKey: config.get('ENCRYPTION_KEY') || process.env.ENCRYPTION_KEY || '',
  jwtSecret: config.get('JWT_SECRET') || process.env.JWT_SECRET || '',
  whiteList: config.get('CORS_WHITELIST') || process.env.CORS_WHITELIST || [],
  environment: config.get('ENVIRONMENT') || process.env.NODE_ENV || '',
  dbConfig: {
    HOST: config.get('DB_HOST')|| process.env.DB_HOST || '',
    USER: config.get('DB_USER')|| process.env.DB_USER ||'',
    PASSWORD: config.get('DB_PASSWORD')|| process.env.DB_PASSWORD || '',
    DB: config.get('DB_NAME') || process.env.DB_NAME ||'',
    dialect: config.get('DB_DIALECT') || process.env.DB_DIALECT || '',
  },
};

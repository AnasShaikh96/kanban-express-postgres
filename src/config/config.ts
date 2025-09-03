import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').required(),
  DB_DATABASE: Joi.string().required(),
  CORS_ORIGIN: Joi.string().optional(),
}).unknown(true);

const { value, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

const config = {
  port: Number(value.PORT),
  nodeEnv: String(value.NODE_ENV),
  database: {
    host: String(value.DB_HOST),
    port: Number(value.DB_PORT),
    user: String(value.DB_USER),
    password: String(value.DB_PASSWORD),
    database: String(value.DB_DATABASE),
  },
  corsOrigin: value.CORS_ORIGIN || '*',
};

export default config;
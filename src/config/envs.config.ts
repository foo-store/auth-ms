import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  NATS_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

const envsSchema = joi
  .object({
    NATS_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  natsUrl: envVars.NATS_URL,
  jwtSecret: envVars.JWT_SECRET,
  jwtExpirationIn: envVars.JWT_EXPIRES_IN,
};

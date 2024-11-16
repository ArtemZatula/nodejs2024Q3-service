import { config } from 'dotenv';
config();

export const getPort = () => process.env.PORT || 4000;

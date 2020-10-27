import 'dotenv/config';

export const __Prod__ = process.env.NODE_ENV === 'production';
export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI ? process.env.DB_URI : '';
export const JWT_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : '';
export const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY
  ? process.env.WC_CONSUMER_KEY
  : '';
export const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET
  ? process.env.WC_CONSUMER_SECRET
  : '';

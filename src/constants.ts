import 'dotenv/config';

export const __Prod__ = process.env.NODE_ENV === 'production'
export const PORT = process.env.PORT
export const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/wc-handler'

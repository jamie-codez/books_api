import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { DATABASE_CONNECTION } from '../../constants';

dotenv.config();
export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return datasource.initialize();
    },
  },
];

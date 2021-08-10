import * as dotenv from 'dotenv';
dotenv.config();
const config: any = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

if (process.env.NODE_ENV !== 'local') {
  config.ssl = {
    require: true,
    rejectUnauthorized: false,
  };
}

export = config;

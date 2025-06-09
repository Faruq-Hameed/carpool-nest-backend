import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    type: 'postgres',
    host: process.env.AUTH_DB_HOST,
    port:process.env.DB_PORT,
    username: process.env.AUTH_DB_USER,
    password: process.env.AUTH_DB_PASSWORD,
    database: process.env.AUTH_DB_NAME,
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
}))
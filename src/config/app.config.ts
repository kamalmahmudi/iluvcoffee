export default () => ({
  environment: process.env.NODE_ENV || 'development',
  apiKey: 'expected_key',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    logging:
      process.env.DATABASE_LOGGING &&
      !['0', 'false'].includes(process.env.DATABASE_LOGGING),
    autoLoadEntities: process.env.NODE_ENV === 'test',
    synchronize: process.env.NODE_ENV === 'test',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/**/*.js']
  }
})

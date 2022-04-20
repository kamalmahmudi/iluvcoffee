import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeeModule } from './coffee/coffee.module'
import appConfig from './config/app.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get('database')
        return {
          type: 'mariadb',
          ...config
        }
      }
    }),
    CoffeeModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

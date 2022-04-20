import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CoffeeController } from './coffee.controller'
import { CoffeeService } from './coffee.service'
import { Coffee, Flavor } from './entities'

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeeController],
  providers: [CoffeeService]
})
export class CoffeeModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/common/decorators/public.decorator'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto'
import { CoffeeService } from './coffee.service'
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto'

@ApiTags('coffee')
@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery)
  }

  @ApiForbiddenResponse({
    description: 'Error: Forbidden'
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeeService.findOne(id)
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    this.coffeeService.remove(id)
  }
}

import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CreateCoffeeDto } from 'src/coffee/dto'
import { GlobalExceptionFilter } from 'src/common/filters/global-exception.filter'
import {
  TimeoutInterceptor,
  WrapResponseInterceptor
} from 'src/common/interceptors'
import * as request from 'supertest'
import { CoffeeModule } from '../../src/coffee/coffee.module'
import appConfig from '../../src/config/app.config'

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla']
  }

  let app: INestApplication

  beforeAll(async () => {
    console.log(appConfig().database)
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mariadb',
          ...appConfig().database
        }),
        CoffeeModule
      ]
    }).compile()
    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true
      })
    )
    app.useGlobalFilters(new GlobalExceptionFilter())
    app.useGlobalInterceptors(
      new TimeoutInterceptor(),
      new WrapResponseInterceptor()
    )
    await app.init()
  })

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
  })

  it.todo('Get all [GET /]')
  it.todo('Get one [GET /:id]')
  it.todo('Update one [PATCH /:id]')
  it.todo('Delete one [DELETE /:id]')

  afterAll(async () => {
    await app.close()
  })
})

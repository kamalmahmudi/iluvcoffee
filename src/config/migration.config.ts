import { DataSource } from 'typeorm'
import appConfig from './app.config'

const config = appConfig()
export const connectionSource = new DataSource({
  type: 'mariadb',
  ...config.database
})

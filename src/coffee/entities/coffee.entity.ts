import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Flavor } from './flavor.entity'

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 32 })
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ length: 32 })
  brand: string

  @Column({ default: 0 })
  recommendations: number

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[]
}

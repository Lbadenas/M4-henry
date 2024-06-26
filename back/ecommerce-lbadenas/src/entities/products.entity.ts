import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderdetails.entity';

@Entity({ name: 'PRODUCTS' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'text',
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'categories_id' })
  category: Categories;

  //en una relacion manytomany no hace falta hacerlo en ambas tablas
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  @JoinColumn()
  orderdetails: OrderDetails[];
}

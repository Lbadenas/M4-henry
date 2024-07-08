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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'PRODUCTS' })
export class Products {
  @ApiProperty({
    description: 'El identificador único del producto',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'El nombre del producto',
    example: 'Producto de ejemplo',
    uniqueItems: true,
  })
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    description: 'La descripción del producto',
    example: 'Esta es una descripción de ejemplo para un producto.',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @ApiProperty({
    description: 'El precio del producto',
    example: 99.99,
    type: Number,
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    description: 'El stock disponible del producto',
    example: 100,
    type: Number,
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @ApiProperty({
    description: 'La URL de la imagen del producto',
    example: 'http://example.com/image.jpg',
  })
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

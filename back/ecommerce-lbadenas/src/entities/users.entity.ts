import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'USERS' })
export class Users {
  @ApiProperty({
    description: 'El identificador único del usuario',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'El nombre del usuario',
    example: 'John Doe',
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario',
    example: 'john.doe@example.com',
    uniqueItems: true,
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'La contraseña del usuario',
    example: 'hashedpassword',
  })
  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  password: string;

  @ApiProperty({
    description: 'El número de teléfono del usuario',
    example: 1234567890,
  })
  @Column({
    type: 'int',
  })
  phone: number;

  @ApiProperty({
    description: 'El país del usuario',
    example: 'Spain',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @ApiProperty({
    description: 'La dirección del usuario',
    example: '123 Main St',
  })
  @Column({
    type: 'text',
  })
  address: string;

  @ApiProperty({
    description: 'La ciudad del usuario',
    example: 'Madrid',
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @ApiProperty({
    description: 'Indica si el usuario es administrador',
    example: false,
  })
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}

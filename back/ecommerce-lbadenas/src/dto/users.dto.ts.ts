import { ApiHideProperty, ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  Validate,
  IsNumber,
  IsEmpty,
} from 'class-validator';
import { matchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @ApiProperty({
    description:
      'El nombre del usuario, debe ser un string entre 3 y 80 caracteres.',
    example: 'Test User01',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'El nombre no puede tener más de 80 caracteres.' })
  name: string;

  @ApiProperty({
    description:
      'El correo electrónico del usuario, debe ser un string en formato email.',
    example: 'user01@example.com',
  })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail(
    {},
    { message: 'El correo electrónico debe tener una estructura válida.' },
  )
  email: string;

  @ApiProperty({
    description:
      'La contraseña del usuario, debe ser un string entre 8 y 15 caracteres, incluyendo al menos una letra mayúscula, una minúscula, un número y un carácter especial.',
    example: 'Test1234#',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El password debe tener al menos 3 caracteres.' })
  @MaxLength(15, {
    message: 'El password no puede tener más de 15 caracteres.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*. Además, debe tener una longitud de entre 8 y 15 caracteres.',
  })
  password: string;

  @ApiProperty({
    description:
      'Confirmación de la contraseña del usuario, debe coincidir con la contraseña.',
    example: 'Test1234#',
  })
  @IsNotEmpty()
  @Validate(matchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    description:
      'La dirección del usuario, debe ser un string entre 3 y 80 caracteres.',
    example: '123 Main St',
  })
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres.' })
  @MaxLength(80, {
    message: 'La dirección no puede tener más de 80 caracteres.',
  })
  address: string;

  @ApiProperty({
    description: 'El número de teléfono del usuario.',
    example: 1234567890,
    type: Number,
  })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio.' })
  @IsNumber()
  phone: number;

  @ApiProperty({
    description:
      'El país del usuario, debe ser un string entre 4 y 20 caracteres.',
    example: 'Spain',
  })
  @IsNotEmpty({ message: 'El país es obligatorio.' })
  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @MinLength(4, { message: 'El país debe tener al menos 4 caracteres.' })
  @MaxLength(20, { message: 'El país no puede tener más de 20 caracteres.' })
  country: string;

  @ApiProperty({
    description:
      'La ciudad del usuario, debe ser un string entre 5 y 20 caracteres.',
    example: 'Madrid',
  })
  @IsNotEmpty({ message: 'La ciudad es obligatoria.' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no puede tener más de 20 caracteres.' })
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}

export class LogginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

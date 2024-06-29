import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MinLength,
  MaxLength,
  IsNumberString,
  isString,
} from 'class-validator';

export class CreateUserDto {
  // id: string;

  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'El nombre no puede tener más de 80 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsEmail(
    {},
    { message: 'El correo electrónico debe tener una estructura válida.' },
  )
  email: string;

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

  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres.' })
  @MaxLength(80, {
    message: 'La dirección no puede tener más de 80 caracteres.',
  })
  address: string;

  @IsNotEmpty({ message: 'El número de teléfono es obligatorio.' })
  @IsNumberString({}, { message: 'El número de teléfono debe ser un número.' })
  phone: string;

  @IsNotEmpty({ message: 'El país es obligatorio.' })
  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @MinLength(4, { message: 'El país debe tener al menos 4 caracteres.' })
  @MaxLength(20, { message: 'El país no puede tener más de 20 caracteres.' })
  country: string;

  @IsNotEmpty({ message: 'La ciudad es obligatoria.' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no puede tener más de 20 caracteres.' })
  city: string;
}

export class LogginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}

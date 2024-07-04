import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcryp from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuth() {
    return `Authentication successful`;
  }
  async signIn(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('Credenciales incorrectas');

    //validar password
    const validPassword = await bcryp.compare(password, user.password);
    if (!validPassword)
      throw new BadRequestException('Credenciales incorrectas');

    //firmar token

    const payLoad = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payLoad);

    return { message: 'usuario loggeado...', token };
  }
  async signUp(user: Partial<Users>) {
    const { email, password } = user;
    //verificar que el usuario no se encuentre registrado
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser)
      throw new BadRequestException('El mail ya se encuentra registrado');
    //hashar la contraseña
    const hashedPassword = await bcryp.hash(password, 10);
    //guardar el usuario en base de datos
    return await this.usersRepository.addUser({
      ...user,
      password: hashedPassword,
    });
  }
}

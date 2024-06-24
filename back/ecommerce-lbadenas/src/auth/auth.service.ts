import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return `Authentication successful`;
  }
  signIn(email: string, password: string) {
    if (!email || !password) return `EMAIL Y PASSWORD REQUERIDOS`;
    const user = this.usersRepository.getUserByEmail(email);
    if (!user || user.password !== password) {
      return 'crendenciales incorrectas';
    }
    return 'usuario loggeado (SE ENVIA TOKEN)';
  }
}

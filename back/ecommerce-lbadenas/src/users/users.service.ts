import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}
  getUsers(page: number, limit: number) {
    return this.userRepository.getUsers(page, limit);
  }
  getUser(id: string) {
    return this.userRepository.getUserById(id);
  }
  addUser(user: any) {
    return this.userRepository.addUser(user);
  }
  updateUser(id: string, user: any) {
    return this.userRepository.updateUser(id, user);
  }
  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}

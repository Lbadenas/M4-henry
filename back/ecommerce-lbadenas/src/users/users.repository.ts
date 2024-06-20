import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,

      email: 'lucho10@gmail.com',

      name: 'luciano',

      password: '1234',

      address: 'callefalsa',

      phone: '1545657897',

      country: 'hurlingham',

      city: 'buenos aires',
    },
  ];

  async getUsers() {
    return this.users;
  }
}

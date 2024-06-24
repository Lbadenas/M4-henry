import { Injectable } from '@nestjs/common';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country?: string | undefined;
  city?: string | undefined;
}

//* BBDD
const users: User[] = [
  {
    id: '1001',
    name: 'Homero Simpson',
    email: 'homero@mail.com',
    password: 'donuts123',
    address: '742 Evergreen Terrace',
    phone: '555-1234',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '1002',
    name: 'Marge Simpson',
    email: 'marge@mail.com',
    password: 'bluehair',
    address: '742 Evergreen Terrace',
    phone: '555-5678',
    country: 'USA',
    city: 'Springfield',
  },
  {
    id: '1003',
    name: 'Lisa Simpson',
    email: 'lisa@mail.com',
    password: 'saxophone',
    address: '742 Evergreen Terrace',
    phone: '555-8765',
    country: 'USA',
    city: 'Springfield',
  },
];

@Injectable()
export class UsersRepository {
  async getUsers(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const userList = users.slice(start, end);
    return userList.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string) {
    //verifico que el usuario exista
    const foundUser = users.findIndex((u) => u.id === id);
    if (foundUser === -1) return `no se encontro usuario con ${id}`;
    // quitamos el password del usuario que encontro
    const { password, ...userNoPassword } = users[foundUser];
    return userNoPassword;
  }

  async addUser(user: User) {
    users.push({ ...user, id: user.email });
    return user.email;
  }

  async updateUser(id: string, user: User) {
    //verifico que exista el usuario
    const foundUser = users.findIndex((u) => u.id === id);
    if (foundUser === -1) return `no se encontro usuario con ${id}`;
    users[foundUser] = { ...users[foundUser], ...user };
    return users[foundUser].id;
  }

  async deleteUser(id: string) {
    //verifico que exista el usuario
    const foundUser = users.findIndex((u) => u.id === id);
    if (foundUser === -1) return `no se encontro usuario con ${id}`;
    users.splice(foundUser, 1);
    return id;
    // si yo tengo [0,1,2,3] al borrar un solo elemento con el splice quedaria [0,1,3]
  }

  getUserByEmail(email: string) {
    return users.find((users) => users.email === email);
  }
}

import {
  DATABASE_CONNECTION,
  ROLES_REPOSITORY,
  USER_REPOSITORY,
} from '../constants';
import { Role, User } from './entities/user.entity';
import { DataSource } from 'typeorm';

export const userRepoProvider = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];

export const rolesRepoProvider = [
  {
    provide: ROLES_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(Role),
    inject: [DATABASE_CONNECTION],
  },
];

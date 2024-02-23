import { AUTH_REPOSITORY, DATABASE_CONNECTION } from '../constants';
import { Role } from '../user_service/entities/user.entity';

export const authRepoProvider = [
  {
    provide: AUTH_REPOSITORY,
    useFactory: (connection) => connection.getRepository(Role),
    inject: [DATABASE_CONNECTION],
  },
];

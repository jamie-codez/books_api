import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email;
    return this.userService
      .findUserByEmail(email)
      .then((user) => {
        if (user) {
          throw new ConflictException('User already exists');
        }
        return true;
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }
}

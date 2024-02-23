import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user_service/user.service';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email;
    return this.userService
      .findOneByEmail(email)
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

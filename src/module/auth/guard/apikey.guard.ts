import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const apiKey = req.headers['api-key'];

    return this.validateApiKey(apiKey);
  }

  validateApiKey(apiKey) {
    if (!apiKey) {
      new UnauthorizedException();
    }

    return apiKey;
  }
}

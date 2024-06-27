import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UserEditGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userPayload = await this.validateToken(request);
    const userIdToEdit = parseInt(request.params.userId, 10);

    if (userPayload.id !== userIdToEdit) {
      throw new ForbiddenException(
        'No está autorizado para editar este usuario',
      );
    }

    return true;
  }

  private async validateToken(request): Promise<any> {
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException({ message: 'No autorizado' });
    }

    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException();
      }
      throw new InternalServerErrorException();
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    // The Authorization header should be in the format "Bearer <token>"
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    // If the type is "Bearer", return the token. Otherwise, return undefined.
    return type === 'Bearer' ? token : undefined;
  }
}

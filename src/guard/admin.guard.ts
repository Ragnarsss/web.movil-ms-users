import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { roles } from 'src/common/constants';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extract the token from the Authorization header
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      // If there's no token, throw an UnauthorizedException
      throw new UnauthorizedException({ message: 'No autorizado' });
    }
    try {
      // Verify the token using the JwtService
      // If the token is not valid, verifyAsync will throw an error
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Check the user's role
      if (payload.role !== roles.ADMIN) {
        throw new ForbiddenException(
          'No tiene permiso para acceder a este recurso',
          payload.role,
        );
      }

      // If everything is fine, let the request proceed
      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      } else if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  private extractTokenFromHeader(request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return null;
    }
    return token;
  }
}

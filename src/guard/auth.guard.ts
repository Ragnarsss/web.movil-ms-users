import { ConfigService } from '@nestjs/config';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 *
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructs the AuthGuard.
   * @param jwtService - The JwtService to use for verifying JWT tokens.
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Determines whether the route can be activated.
   * @param context - The execution context.
   * @returns A promise that resolves to true if the route can be activated, or throws an UnauthorizedException if not.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extract the token from the Authorization header
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      // If there's no token, throw an UnauthorizedException
      throw new UnauthorizedException('No autorizado');
    }
    try {
      // Verify the token using the JwtService
      // If the token is not valid, verifyAsync will throw an error
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      // If the token is valid, add the payload to the request object
      // The payload usually contains user information
      request.user = payload;
    } catch {
      // If verifyAsync throws an error, catch it and throw an UnauthorizedException
      throw new UnauthorizedException('No autorizado');
    }

    // If everything is OK, return true to let the request proceed
    return true;
  }

  /**
   * Extracts the JWT token from the authorization header of the request.
   * @param request - The request object.
   * @returns The JWT token if present and of type Bearer, or undefined otherwise.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    // The Authorization header should be in the format "Bearer <token>"
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    // If the type is "Bearer", return the token. Otherwise, return undefined.
    return type === 'Bearer' ? token : undefined;
  }
}

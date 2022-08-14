import { Module } from '@nestjs/common';
import { AuthzService } from './authz.service';
import { AuthzController } from './authz.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthzService, JwtStrategy],
  controllers: [AuthzController],
  exports: [PassportModule],
})
export class AuthzModule {}

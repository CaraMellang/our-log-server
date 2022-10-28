import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { User } from './entity/user/user.entity';
import { AuthToken } from './entity/auth/auth-token.entity';
import { UserLoginHistory } from './entity/user/user-login-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('DBUSERNAME'), //윈도우에서는 ㄹㅇ 사용자 이름을 가져와서 오류가 생깁니다.(USERNAME일 경우)
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [User, AuthToken, UserLoginHistory],
        // entities: ['**/*.entity.(t|j)s']
        autoLoadEntities: true,
        synchronize: true,
        // synchronize:
        //   configService.get('NODE_ENV') === 'development' ? true : false,
        namingStrategy: new SnakeNamingStrategy(),
        logging: configService.get('NODE_ENV') === 'development' ? true : false,
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

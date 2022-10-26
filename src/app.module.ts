import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/post.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientModule } from './patients/patient.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { PersonalAccessTokenModule } from './personal-access-tokens/personal-access-token.module';
import { DiseaseTypeModule } from './disease-types/disease-type.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    SocketModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://clusterUser:quanga98@cluster0.31zwcnn.mongodb.net/hospital',
    ),
    PostsModule,
    UserModule,
    AuthModule,
    PatientModule,
    DiseaseTypeModule,
    PersonalAccessTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/login', 'auth/refreshToken')
      .forRoutes('users');
  }
}

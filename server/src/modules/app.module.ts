import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CompetenciesModule } from './competencies/competencies.module';
import { DeveloperLevelsModule } from './developerLevels/developerLevels.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { Seeder } from './seeder';
import { MaterialsModule } from './materials/materials.module';
import { ImagesModule } from './images/images.module';
import { LessonsModule } from './lessons/lessons.module';
import { UserCompetenciesModule } from './user-competencies/user-competencies.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/images',
      rootPath: join(__dirname, '..', '../../../uploads'),
    }),
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
          ssl: configService.get('DB_SSL')
            ? {
                rejectUnauthorized: false,
              }
            : false,
        };
      },
      inject: [ConfigService],
    }),
    CompetenciesModule,
    DeveloperLevelsModule,
    UsersModule,
    AuthModule,
    MaterialsModule,
    ImagesModule,
    KnowledgeModule,
    LessonsModule,
    UserCompetenciesModule,
  ],
  providers: [Seeder],
  exports: [AuthModule],
})
export class AppModule {}

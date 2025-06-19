import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [

        ConfigModule.forRoot({
            isGlobal:true,
            load:[configuration]
        }),

        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            useFactory:(configService:ConfigService)=>({
                type:'postgres',
                host:configService.get('database.host'),
                port: +configService.get('database.port'),
                username:configService.get('database.username'),
                password:configService.get('database.password'),
                database:configService.get('database.name'),
                entities:[__dirname + '/**/*.entity{.ts,.js}'],
                synchronize:true, //do not true this in production
                keepConnectionAlive:true,
                timezone:'UTC',
                ssl:configService.get('databse.ssl'),
                extra: configService.get('database.ssl') ? {
                    ssl: {
                        rejectUnauthorized:false
                    }
                } : null,
                autoLoadEntities:true
            }),
            inject:[ConfigService]
        }),

        BookModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

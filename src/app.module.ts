import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './accounts/accounts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './accounts/accounts.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: 'root',
      password: "BITS@lite",
      database: "Clearfeed_Starter",
      models: [Account],
    }),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

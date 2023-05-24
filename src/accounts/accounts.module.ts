import { Module } from "@nestjs/common";
import { AccountController } from "./accounts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Account } from "./accounts.entity";
import { AccountService } from "./accounts.service";

@Module({
    imports: [
        SequelizeModule.forFeature([Account])
    ],
    providers: [
        AccountService
    ],
    controllers: [AccountController],
})
export class AccountModule {}
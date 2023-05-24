import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Settings } from "./settings.entity";
import { Account } from "src/accounts/accounts.entity";
import { SettingsService } from "./settings.service";
import { AccountService } from "src/accounts/accounts.service";
import { SettingsController } from "./settings.controller";

@Module({
    imports: [
        SequelizeModule.forFeature([Settings,Account])
    ],
    providers: [SettingsService, AccountService],
    controllers: [SettingsController],
})
export class SettingsModule {}
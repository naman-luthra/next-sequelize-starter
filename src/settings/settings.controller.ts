import { BadRequestException, Body, Controller, Delete, ForbiddenException, NotFoundException, Patch, Post } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { AccountService } from "src/accounts/accounts.service";

@Controller("settings")
export class SettingsController {
    constructor(
        private readonly settingsService: SettingsService,
        private readonly accountsService: AccountService
    ) {}

    @Post("add")
    async addNewSetting(
        @Body('name') name: string,
        @Body('dataType') data_type: string,
        @Body('accountId') account_id: number,
        @Body('password') password: string,
        @Body('value') value: any,
    ){
        if(!name || !data_type || account_id===undefined || value===undefined)
            throw new BadRequestException();

        const accountExists = await this.accountsService.accountExists(account_id, password);
        if(!accountExists)
            throw new ForbiddenException("id/password wrong!");
 
        const settingExists = await this.settingsService.settingExists(account_id, name);
        if(settingExists)
            throw new BadRequestException("Setting already exists use /settings/update");

        const newSetting = await this.settingsService.addSettingToDB(name, data_type, account_id, value);
        return newSetting;
    }

    @Patch("update")
    async updateSetting(
        @Body('name') name: string,
        @Body('accountId') account_id: number,
        @Body('password') password: string,
        @Body('value') value: any,
    ){
        if(!name || account_id===undefined || value===undefined)
            throw new BadRequestException();

        const accountExists = await this.accountsService.accountExists(account_id, password);
        if(!accountExists)
            throw new ForbiddenException("id/password wrong!");
        const data_type = await this.settingsService.getSettingDatatype(account_id, name);
        if(typeof value !== data_type)
            throw new BadRequestException("Value not of given data");
        const updateSetting = await this.settingsService.updateSettingToDB(account_id, name, value);
        return updateSetting;
    }

    @Delete("delete")
    async deleteSetting(
        @Body('name') name: string,
        @Body('accountId') account_id: number,
        @Body('password') password: string,
    ){
        if(!name || account_id===undefined)
            throw new BadRequestException();

        const accountExists = await this.accountsService.accountExists(account_id, password);
        if(!accountExists)
            throw new ForbiddenException("id/password wrong!");
 
        const settingExists = await this.settingsService.settingExists(account_id, name);
        if(!settingExists)
            throw new BadRequestException("Setting does't exist!");
        const deleteSetting = await this.settingsService.deleteSettingFromDB(account_id, name);
        return deleteSetting;
    }
}
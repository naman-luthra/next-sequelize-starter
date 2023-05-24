import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Settings } from "./settings.entity";

@Injectable()
export class SettingsService {
    constructor (
        @InjectModel(Settings)
        private settingsModel: typeof Settings
    ) {}

    async addSettingToDB(name: string, data_type: string, account_id: number, value: any){
        if(typeof value !== data_type)
            throw new BadRequestException("Value not of given data")
        const newSetting = await this.settingsModel.create({
            name,
            data_type,
            account_id,
            value
        })
        return newSetting;
    }

    async settingExists(account_id: number, name: string){
        const setting = await this.settingsModel.findOne({
            where:{
                name,
                account_id
            }
        });

        if(setting===null) return false;
        return true;
    }

    async getSettingDatatype(account_id: number, name: string){
        const oldSetting = await this.settingsModel.findOne({
            where:{
                name,
                account_id
            }
        });
        if(oldSetting===null)
            throw new NotFoundException("No such setting found. use /setting/add endpoint to create a new setting!");
        return oldSetting.data_type;
    }

    async updateSettingToDB(account_id: number, name: string, value: any){
        const updatedSetting = await this.settingsModel.update({value},{
            where: {
                account_id,
                name
            }
        });
        return updatedSetting;
    }

    async deleteSettingFromDB(account_id: number, name: string){
        const deleteSetting = await this.settingsModel.destroy({
            where: {
                account_id,
                name
            }
        });
        return deleteSetting;
    }
}
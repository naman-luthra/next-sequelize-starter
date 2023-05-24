import { ConflictException, Injectable } from "@nestjs/common";
import { Account } from "./accounts.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class AccountService{
    constructor(
        @InjectModel(Account)
        private accountModel: typeof Account,
    ) {}

    async addNewAccountToDB(name: string){
        const dupAccount = await this.accountModel.findOne({
            where: {
                name
            }
        });
        if(dupAccount !== null)
            throw new ConflictException("User already exists with same name");
        
        const newAccount = await this.accountModel.create({
            name
        })
        return newAccount;
    }

    async accountExists(id: number){
        const dupAccount = await this.accountModel.findOne({
            where: {
                id
            }
        });
        if(dupAccount !== null) return true;
        return false
    }
}
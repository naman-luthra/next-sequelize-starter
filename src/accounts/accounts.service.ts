import { ConflictException, Injectable } from "@nestjs/common";
import { Account } from "./accounts.entity";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService{
    constructor(
        @InjectModel(Account)
        private accountModel: typeof Account,
    ) {}

    async addNewAccountToDB(name: string, hashedPassword:string){
        const dupAccount = await this.accountModel.findOne({
            where: {
                name
            }
        });
        if(dupAccount !== null)
            throw new ConflictException("User already exists with same name");
        
        const newAccount = await this.accountModel.create({
            name,
            password: hashedPassword
        })
        return newAccount;
    }

    async accountExists(id: number, password: string){
        const dupAccount = await this.accountModel.findOne({
            where: {
                id
            }
        });
        if(dupAccount === null) return false;
        const passwordCorrect = await bcrypt.compare(password, dupAccount.password);
        if(passwordCorrect) return true;
        else return false;
    }

    async hashPassword(password: string){
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    }
}
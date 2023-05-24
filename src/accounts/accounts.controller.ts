import { Body, Controller, Post } from "@nestjs/common";
import { AccountService } from "./accounts.service";

@Controller('account')
export class AccountController{
    constructor(
        private readonly accountService: AccountService,
    ) {}
    @Post('signup')
    async createNewAccount(
        @Body('name') name: string
    ){
        const newAccount = await this.accountService.addNewAccountToDB(name);
        return newAccount;
    }
}
import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
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
        if(!name)
            throw new BadRequestException();
        const newAccount = await this.accountService.addNewAccountToDB(name);
        return newAccount;
    }
}
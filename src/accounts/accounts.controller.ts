import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AccountService } from "./accounts.service";

@Controller('account')
export class AccountController{
    constructor(
        private readonly accountService: AccountService,
    ) {}
    @Post('signup')
    async createNewAccount(
        @Body('name') name: string,
        @Body('password') password: string
    ){
        if(!name || !password)
            throw new BadRequestException();
        const hashedPassword = await this.accountService.hashPassword(password);
        const {
            id,
            createdAt
        } = await this.accountService.addNewAccountToDB(name,hashedPassword);
        return {
            id,
            createdAt
        };
    }
}
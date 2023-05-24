import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Account } from "src/accounts/accounts.entity";

@Table
export class Settings extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column
    data_type: string;

    @ForeignKey(()=>Account)
    @Column
    account_id: number;

    @Column
    value: string;

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;

    @Column
    deletedAt: Date;
}
import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Account extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    id: number;

    @Column
    name: string;

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;

    @Column
    deletedAt: Date;
}
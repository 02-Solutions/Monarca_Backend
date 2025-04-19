import { IsDate, isDate, IsNumber, isString, IsString } from "class-validator";

export class CreateVoucherDto{
    @IsString()
    id_request: string;
    @IsString()
    class: string;
    @IsNumber()
    amount: number;
    @IsDate()
    date: string;
    @IsString()
    file_url: string;
}
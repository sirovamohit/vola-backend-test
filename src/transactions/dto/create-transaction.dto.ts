import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
    @ApiProperty({ description: 'ID of the card associated' })
    @IsString()
    @IsNotEmpty()
    cardId: string;

    @ApiProperty({ description: 'Transaction amount' })
    @IsNumber()
    @IsPositive()
    amount: number;

    @ApiProperty({ enum: TransactionType })
    @IsEnum(TransactionType)
    transactionType: TransactionType;
}
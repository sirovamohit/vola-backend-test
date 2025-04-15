import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsISO8601, IsOptional } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class TransactionQueryDto {
    @ApiPropertyOptional({ description: 'Start date filter (ISO8601)' })
    @IsISO8601()
    @IsOptional()
    startDate?: Date;

    @ApiPropertyOptional({ description: 'End date filter (ISO8601)' })
    @IsISO8601()
    @IsOptional()
    endDate?: Date;

    @ApiPropertyOptional({ enum: TransactionType })
    @IsEnum(TransactionType)
    @IsOptional()
    type?: TransactionType;
}
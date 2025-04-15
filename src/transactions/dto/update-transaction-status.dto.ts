import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TransactionStatus } from '../entities/transaction.entity';

export class UpdateTransactionStatusDto {
    @ApiProperty({
        enum: ['failed', 'refunded', 'approved'],
        description: 'New transaction status'
    })
    @IsEnum(['failed', 'refunded', 'approved'], {
        message: 'Status must be one of: failed, refunded, approved'
    })
    status: TransactionStatus;
}
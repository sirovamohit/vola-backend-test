import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Transactions } from '../core/database/model/transaction.model';
import { Card } from '../core/database/model/card.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';
import { TransactionType, TransactionStatus } from './entities/transaction.entity';
import { Op } from 'sequelize';

@Injectable()
export class TransactionsService {
    constructor(
    ) { }

    async createTransaction(createDto: CreateTransactionDto) {
        const card = await Card.findByPk(createDto.cardId);
        if (!card) {
            throw new NotFoundException('Card not found');
        }

        if (createDto.transactionType === TransactionType.DEBIT && card.balance < createDto.amount) {
            throw new BadRequestException('Insufficient balance for debit transaction');
        }

        const transaction = await Transactions.create({
            ...createDto,
            status: TransactionStatus.PENDING,
        });

        if (createDto.transactionType === TransactionType.DEBIT) {
            await Card.update(
                { balance: card.balance - createDto.amount },
                { where: { id: createDto.cardId } }
            );
        }

        return {
            transactionId: transaction.id,
            status: transaction.status,
            updatedBalance: (await Card.findByPk(createDto.cardId))?.balance
        };
    }

    async findAllTransactions(query: TransactionQueryDto) {
        const where: any = {};
        if (query.startDate && query.endDate) {
            where.createdAt = {
                [Op.between]: [query.startDate, query.endDate]
            };
        }
        if (query.type) {
            where.transactionType = query.type;
        }
        return Transactions.findAll({ where });
    }

    async findTransactionById(id: string) {
        const transaction = await Transactions.findByPk(id);
        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }
        return transaction;
    }

    async updateTransactionStatus(id: string, updateDto: UpdateTransactionStatusDto) {
        const transaction = await this.findTransactionById(id);

        if (updateDto.status === TransactionStatus.PENDING) {
            throw new BadRequestException('Cannot update status to pending');
        }

        if (![TransactionStatus.APPROVED, TransactionStatus.FAILED, TransactionStatus.REFUNDED].includes(updateDto.status)) {
            throw new BadRequestException('Invalid status transition');
        }

        await transaction.update({ status: updateDto.status });
        return transaction;
    }

    async deleteTransaction(id: string) {
        const transaction = await this.findTransactionById(id);

        if (transaction.status !== TransactionStatus.PENDING) {
            throw new BadRequestException('Can only delete pending transactions');
        }

        await transaction.destroy();
        return { message: 'Transaction deleted successfully' };
    }
}
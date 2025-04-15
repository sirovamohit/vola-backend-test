import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';
import { TransactionQueryDto } from './dto/transaction-query.dto';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from 'src/core/guards/auth-guard.guard';

@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard)
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new transaction' })
    @ApiResponse({ status: 201, description: 'Transaction created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    async create(@Body() createTransactionDto: CreateTransactionDto) {
        return this.transactionsService.createTransaction(createTransactionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all transactions with filters' })
    async findAll(@Query() query: TransactionQueryDto) {
        return this.transactionsService.findAllTransactions(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single transaction by ID' })
    @ApiResponse({ status: 404, description: 'Transaction not found' })
    async findOne(@Param('id') id: string) {
        return this.transactionsService.findTransactionById(id);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Update transaction status' })
    @ApiResponse({ status: 200, description: 'Status updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid status transition' })
    async updateStatus(
        @Param('id') id: string,
        @Body() updateStatusDto: UpdateTransactionStatusDto,
    ) {
        return this.transactionsService.updateTransactionStatus(id, updateStatusDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a transaction' })
    @ApiResponse({ status: 200, description: 'Transaction deleted successfully' })
    @ApiResponse({ status: 400, description: 'Cannot delete non-pending transaction' })
    async remove(@Param('id') id: string) {
        return this.transactionsService.deleteTransaction(id);
    }
}
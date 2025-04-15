import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    Default,
} from 'sequelize-typescript';
import { Card } from './card.model';
import { TransactionStatus, TransactionType } from 'src/transactions/entities/transaction.entity';

@Table({
    tableName: 'transactions',
    timestamps: true,
    paranoid: true,
})
export class Transactions extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @ForeignKey(() => Card)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    cardId: string;

    @Column({
        type: DataType.DECIMAL(12, 2),
        allowNull: false,
        field: 'amount',
    })
    amount: number;

    @Column({
        type: DataType.ENUM(...Object.values(TransactionType)),
        allowNull: false,
    })
    transactionType: TransactionType;

    @Default(TransactionStatus.PENDING)
    @Column({
        type: DataType.ENUM(...Object.values(TransactionStatus)),
        allowNull: false,
        field: 'status',
    })
    status: TransactionStatus;

    @BelongsTo(() => Card)
    card: Card;
}


import {
    Column,
    Model,
    Table,
    DataType,
    HasMany,
    Default,
    PrimaryKey,
} from 'sequelize-typescript';
import { Transactions } from './transaction.model';
import { CardStatus } from 'src/transactions/entities/transaction.entity';

@Table({
    tableName: 'cards',
    timestamps: true,
    paranoid: false,
})
export class Card extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    id: string;

    @Default(0.00)
    @Column({
        type: DataType.DECIMAL(12, 2),
        allowNull: false,
        field: 'balance',
    })
    balance: number;

    @Default('USD')
    @Column({
        type: DataType.STRING(3),
        allowNull: false,
        field: 'currency',
    })
    currency: string;

    @Default(CardStatus.ACTIVE)
    @Column({
        type: DataType.ENUM(...Object.values(CardStatus)),
        allowNull: false,
        field: 'status',
    })
    status: CardStatus;

    @HasMany(() => Transactions, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        hooks: true,
    })
    transactions: Transactions[];
}

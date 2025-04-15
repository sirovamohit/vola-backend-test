import { Sequelize } from 'sequelize-typescript';
import { Card } from './model/card.model';
import { Transactions } from './model/transaction.model';

export const databaseServices = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'new_password',
        database: 'mysql',
      });
      sequelize.addModels([Card, Transactions]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
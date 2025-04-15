import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    TransactionsModule,
    DatabaseModule
  ],
  exports: [DatabaseModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }

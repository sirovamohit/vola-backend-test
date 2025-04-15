import { Module } from '@nestjs/common';
import { databaseServices } from './database.service';

@Module({
  imports: [],
  providers: databaseServices,
  exports: databaseServices,
})
export class DatabaseModule { }

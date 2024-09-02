import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartyService } from './service/PartyService';
import { Party } from './entity/Party';
import { PartyController } from './controller/PartyController';

@Module({
  imports: [TypeOrmModule.forFeature([Party])],
  providers: [PartyService],
  controllers: [PartyController],
  exports: [PartyService],
})
export class PartyModule {}
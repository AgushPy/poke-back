import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonController } from './controller/PokemonController';
import { PokemonService } from './service/PokemonService';
import { Pokemon } from './entity/Pokemon';
import { Party } from './entity/Party';
import { PartyService } from './service/PartyService';
import { PokemonModule } from './pokemon.module';
import { PartyModule } from './party.module';
import { PokemonListUp1725233704187 } from './migrations/1725233704187-PokemonListUp';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Pokemon, Party],
      migrations:[PokemonListUp1725233704187],
      synchronize: true,
      migrationsRun: true
    }),
    TypeOrmModule.forFeature([]),
    PokemonModule,
    PartyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

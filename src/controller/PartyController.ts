import { Body, Controller, Get, Post } from '@nestjs/common';
import { Party } from 'src/entity/Party';
import { Pokemon } from 'src/entity/Pokemon';
import { BattleStatus } from 'src/enums/BattleStatus';
import { PartyService } from 'src/service/PartyService';
import { PokemonService } from 'src/service/PokemonService';

@Controller("/api/party")
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Post("/battle")
  battle(@Body() {pokemonPlayer, pokemonCpu }): BattleStatus {
    return this.partyService.battle(pokemonPlayer, pokemonCpu);
  }

  @Get("/all")
  async getAll(): Promise<Party[]> {
    return await this.partyService.findAll();
  }
}

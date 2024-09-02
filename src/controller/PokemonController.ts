import { Controller, Get } from '@nestjs/common';
import { Pokemon } from 'src/entity/Pokemon';
import { PokemonService } from 'src/service/PokemonService';

@Controller("/api/pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get("/healt")
  healt() : String{
    return "Server up";
  }

  @Get("/all")
  async getAll(): Promise<Pokemon[]> {
    return await this.pokemonService.findAll();
  }
}

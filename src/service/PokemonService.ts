import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pokemon } from "src/entity/Pokemon";
import { Repository } from "typeorm";

@Injectable()
export class PokemonService{

    constructor(
        @InjectRepository(Pokemon)
        private readonly pokemonRepository: Repository<Pokemon>,
      ) {}

    async findAll() : Promise<Pokemon[]>{
        return this.pokemonRepository.find();
    }

    
}
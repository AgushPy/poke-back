import { Inject } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Pokemon } from "src/entity/Pokemon";
import { PokemonService } from "src/service/PokemonService";
import { PokemonBuilder } from "test/builder/PokemonBuilder";
import { MockType } from "test/utils/MockType";
import { repositoryMockFactory } from "test/utils/RepositoryMockFactory";
import { Repository } from "typeorm";


describe('PokemonService',()=>{
    let pokemonService : PokemonService;
    let pokemonBuilder : PokemonBuilder;
    let repositoryMock: MockType<Repository<Pokemon>>;

    beforeEach(async() => {
        pokemonBuilder = new PokemonBuilder(); 
        const module  : TestingModule = await Test.createTestingModule({
            providers: [
                PokemonService,
                {
                    provide: getRepositoryToken(Pokemon),
                    useFactory: repositoryMockFactory,
                }
            ]
        }).compile();

        pokemonService = module.get<PokemonService>(PokemonService);
        repositoryMock = module.get(getRepositoryToken(Pokemon));
    })

    it('findAll_wihtOutAttributes_returnPokemonList', async() => {
        const pokemon : Pokemon = pokemonBuilder.common().build();
        const pokemons : Pokemon[] = [pokemon];

        repositoryMock.find?.mockReturnValue(pokemons);
        const result = await pokemonService.findAll();
        
        expect(result).toEqual(pokemons);
        expect(repositoryMock.find).toHaveBeenCalledTimes(1);

    })
})
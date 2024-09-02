import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Pokemon } from "src/entity/Pokemon";
import { BattleStatus } from "src/enums/BattleStatus";
import { PartyService } from "src/service/PartyService";
import { PokemonBuilder } from "test/builder/PokemonBuilder";
import { MockType } from "test/utils/MockType";
import { repositoryMockFactory } from "test/utils/RepositoryMockFactory";
import { Repository } from "typeorm";


describe('PartyService',()=>{
    let partyService : PartyService;
    let pokemonBuilder : PokemonBuilder;
    let repositoryMock: MockType<Repository<Pokemon>>;

    beforeEach(async() => {
        pokemonBuilder = new PokemonBuilder(); 
        const module  : TestingModule = await Test.createTestingModule({
            providers: [
                PartyService,
                {
                    provide: getRepositoryToken(Pokemon),
                    useFactory: repositoryMockFactory,
                }
            ]
        }).compile();

        partyService = module.get<PartyService>(PartyService);
        repositoryMock = module.get(getRepositoryToken(Pokemon));
    })

    it('battle_withBetterPokemonPlayer_ReturnPlayerWin', () => {
        const pokemonPlayer : Pokemon = new PokemonBuilder().common().build();
        const pokemonCpu : Pokemon = new PokemonBuilder().common()
        .withId("pokemon-2")
        .withName("Charmander")
        .withAttack(2)
        .withDefense(2)
        .withHp(3)
        .withSpeed(2)
        .build();

        const result : BattleStatus = partyService.battle(pokemonPlayer, pokemonCpu);

        expect(result).toEqual(BattleStatus.WIN);
    })

    it('battle_withWorstPokemonPlayer_ReturnPlayerDefeat', () => {
        const pokemonCpu : Pokemon = new PokemonBuilder().common().build();
        const pokemonPlayer : Pokemon = new PokemonBuilder().common()
        .withId("pokemon-2")
        .withName("Charmander")
        .withAttack(1)
        .withDefense(4)
        .withHp(3)
        .withSpeed(2)
        .build();

        const result : BattleStatus = partyService.battle(pokemonPlayer, pokemonCpu);

        expect(result).toEqual(BattleStatus.DEFEAT);
    })

    it('battle_withPokemonPlayerAndPokemonCpuEqualsSpeed_ReturnPlayerDefeat', () => {
        const pokemonCpu : Pokemon = new PokemonBuilder().common().build();
        const pokemonPlayer : Pokemon = new PokemonBuilder().common()
        .withId("pokemon-2")
        .withName("Charmander")
        .withAttack(1)
        .withDefense(4)
        .withHp(3)
        .build();

        const result : BattleStatus = partyService.battle(pokemonPlayer, pokemonCpu);

        expect(result).toEqual(BattleStatus.DEFEAT);
    })

    it('battle_withPokemonPlayerAndPokemonCpuEqualsSpeedAndMuchHp_ReturnPlayerDefeat', () => {
        const pokemonCpu : Pokemon = new PokemonBuilder().common().withHp(12).build();
        const pokemonPlayer : Pokemon = new PokemonBuilder().common()
        .withId("pokemon-2")
        .withName("Charmander")
        .withAttack(1)
        .withDefense(4)
        .withHp(12)
        .build();

        const result : BattleStatus = partyService.battle(pokemonPlayer, pokemonCpu);

        expect(result).toEqual(BattleStatus.DEFEAT);
    })
})
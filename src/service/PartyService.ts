import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Party } from "src/entity/Party";
import { Pokemon } from "src/entity/Pokemon";
import { BattleStatus } from "src/enums/BattleStatus";
import { Repository } from "typeorm";

interface PokemonInBattle extends Pokemon{
    owner : "PLAYER" | "CPU";
    order : number;
}

@Injectable()
export class PartyService{

    constructor(
        @InjectRepository(Party)
        private readonly partyRepository: Repository<Party>,
      ) {}
    

    public async findAll() : Promise<Party[]>{
        return this.partyRepository.find();
    }

    public save(round: number, pokemonPlayer : PokemonInBattle, pokemonCpu : PokemonInBattle, battleResult : BattleStatus){
        try {
            const party: Party = new Party();
            party.pokemonPlayer = `The player used ${pokemonPlayer.name}`;
            party.pokemonCpu = `The cpu used ${pokemonCpu.name}`;
            party.rounds = round; // Asegúrate de que este valor es un número válido
            party.result = battleResult;
    
            this.partyRepository.save(party);
        } catch (error) {
            console.error("Error saving party:", error);
        }
    }

    public battle(pokemonPlayer : Pokemon, pokemonCpu : Pokemon) : BattleStatus{
        let round : number = 0;
        let [ pokemonInBattlePlayer , pokemonInBattleCpu]  : [PokemonInBattle , PokemonInBattle] = this.setupBattle(pokemonPlayer,pokemonCpu);
        let battleStatus : BattleStatus = BattleStatus.INPROGRESS;
        while(this.isEqualTo(battleStatus, BattleStatus.INPROGRESS)){
            
            if(pokemonInBattlePlayer.order === 1){
                pokemonInBattleCpu = this.fight(pokemonInBattlePlayer, pokemonInBattleCpu);
            }else{
                pokemonInBattlePlayer = this.fight(pokemonInBattleCpu , pokemonInBattlePlayer);
            }
            
            battleStatus = this.checkBattleStatus(pokemonInBattlePlayer, pokemonInBattleCpu);

            if(!this.isEqualTo(battleStatus,BattleStatus.INPROGRESS)){
                continue;
            }

            if(pokemonInBattlePlayer.order === 2){
                pokemonInBattleCpu = this.fight(pokemonInBattlePlayer, pokemonInBattleCpu);
            }else{
                pokemonInBattlePlayer = this.fight(pokemonInBattleCpu , pokemonInBattlePlayer);
            }

            battleStatus = this.checkBattleStatus(pokemonInBattlePlayer, pokemonInBattleCpu);

            round++;

        }
        this.save(round,pokemonInBattlePlayer,pokemonInBattleCpu,battleStatus);
        return battleStatus;
    }

    private checkBattleStatus(pokemonInBattlePlayer : Pokemon, pokemonInBattleCpu : Pokemon) : BattleStatus{
        const pokemonPlayerIsDead = this.isEqualTo(pokemonInBattlePlayer.hp , 0);
        const pokemonCpuIsDead = this.isEqualTo(pokemonInBattleCpu.hp , 0);
        if(pokemonPlayerIsDead && !pokemonCpuIsDead){
            return BattleStatus.DEFEAT;
        }
        if(!pokemonPlayerIsDead && pokemonCpuIsDead){
            return BattleStatus.WIN;
        }
        return BattleStatus.INPROGRESS;
    }

    private fight(attackerPokemon : PokemonInBattle, defenderPokemon : PokemonInBattle): PokemonInBattle {
        let damage : number = this.countDamage(attackerPokemon, defenderPokemon);
        let restHp : number = this.countRestHp(defenderPokemon, damage);
        defenderPokemon.hp = restHp;
        return defenderPokemon;
    }

    private countRestHp ( defenderPokemon : Pokemon , damage : number ) : number {
            let resultImpactDamage : number = defenderPokemon.hp - damage;
            if(this.isEqualTo(resultImpactDamage, 0) || this.isLessThat(resultImpactDamage, 0)){
                return 0
            }
            return resultImpactDamage;
    }

    private countDamage (attackerPokemon : Pokemon, defenderPokemon : Pokemon) : number {
        if(this.isLessThat(attackerPokemon.attack, defenderPokemon.defense) || this.isEqualTo(attackerPokemon.attack, defenderPokemon.defense)){
            return 1;
        }
        return attackerPokemon.attack - defenderPokemon.defense;
    } 

    private setupBattle (pokemonPlayer : Pokemon, pokemonCpu : Pokemon) : [PokemonInBattle , PokemonInBattle] {
        let pokemonInBattlePlayer : PokemonInBattle = {...pokemonPlayer , owner : "PLAYER" , order : 0};
        let pokemonInBattleCpu : PokemonInBattle = {...pokemonCpu , owner : "CPU" , order : 0};
        
        

        if(this.isPlayerFirstAttack(pokemonInBattlePlayer, pokemonInBattleCpu)){
            pokemonInBattlePlayer.order = 1;
            pokemonInBattleCpu.order = 2;
        }else{
            pokemonInBattleCpu.order = 1;
            pokemonInBattlePlayer.order = 2;
        }
        
        return [pokemonInBattlePlayer , pokemonInBattleCpu];
    }

    private isPlayerFirstAttack(pokemonPlayer : PokemonInBattle, pokemonCpu : PokemonInBattle) : boolean{
        if(this.isEqualTo(pokemonPlayer.speed, pokemonCpu.speed)){
            return this.isMoreThat(pokemonPlayer.attack, pokemonCpu.attack)
        }
        return this.isMoreThat(pokemonPlayer.speed, pokemonCpu.speed);
    }

    private isMoreThat(valueOne : number | string, valueTwo : number | string) : boolean{
        return valueOne > valueTwo;
    }

    private isLessThat(valueOne : number | string, valueTwo : number | string) : boolean{
        return valueOne < valueTwo;
    }

    private isEqualTo(valueOne : number | string, valueTwo : number | string) : boolean {
        return valueOne === valueTwo;
    }
}
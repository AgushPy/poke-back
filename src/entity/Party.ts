import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Pokemon } from "./Pokemon";
import { BattleStatus } from "src/enums/BattleStatus";

@Entity()
export class Party{
    @PrimaryGeneratedColumn()
    public id : number;
    
    @Column()
    public rounds : number;

    @Column()
    public pokemonPlayer : string;
    
    @Column()
    public pokemonCpu : string;

    @Column()
    public result : BattleStatus;
}
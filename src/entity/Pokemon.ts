import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Pokemon {
    @PrimaryColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public attack: number;

    @Column()
    public defense: number;

    @Column()
    public hp: number;

    @Column()
    public speed: number;

    @Column()
    public type: string = "Type";

    @Column()
    public imageUrl: string;
}

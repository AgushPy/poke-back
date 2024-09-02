import { Pokemon } from "src/entity/Pokemon";

export class PokemonBuilder {
    private pokemon: Pokemon;

    constructor() {
        this.pokemon = new Pokemon();
    }

    public common() {
        this.pokemon.id = "pokemon-1",
        this.pokemon.name = "Pikachu",
        this.pokemon.attack = 4,
        this.pokemon.defense = 3,
        this.pokemon.hp = 3,
        this.pokemon.speed = 6,
        this.pokemon.type = "Type",
        this.pokemon.imageUrl = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png"
        return this;
    }

    public withId(id: string): PokemonBuilder {
        this.pokemon.id = id;
        return this;
    }

    public withName(name: string): PokemonBuilder {
        this.pokemon.name = name;
        return this;
    }

    public withAttack(attack: number): PokemonBuilder {
        this.pokemon.attack = attack;
        return this;
    }

    public withDefense(defense: number): PokemonBuilder {
        this.pokemon.defense = defense;
        return this;
    }

    public withHp(hp: number): PokemonBuilder {
        this.pokemon.hp = hp;
        return this;
    }

    public withSpeed(speed: number): PokemonBuilder {
        this.pokemon.speed = speed;
        return this;
    }

    public withType(type: string): PokemonBuilder {
        this.pokemon.type = type;
        return this;
    }

    public withImageUrl(imageUrl: string): PokemonBuilder {
        this.pokemon.imageUrl = imageUrl;
        return this;
    }

    public build(): Pokemon {
        return this.pokemon;
    }
}

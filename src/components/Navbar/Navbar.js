import React, {useState} from 'react';
import Axios from 'axios';
import './Navbar.css';
import Card from './Card/Card';


const Navbar = () => {
    
    const [searchName, setSearchName] = useState('');
    const [pokemonWeight, setPokemonWeight] = useState('');
    const [pokemonHeight, setPokemonHeight] = useState('');
    const [pokemonStats, setPokemonStats] = useState([]);
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonMainImg, setPokemonMainImg] = useState('');
    const [pokemonSprites, setSprites] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState([]);

    const fetchPokemon = (name) => {
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {

            const data = response.data;
            const types = [];
            const stats = [];
            const sprites = [];
            const abilities = [];

            data.types.forEach(t => {
                types.push(t.type.name)
            });
            data.stats.forEach(s => {
                stats.push({name: s.stat.name, value: s.base_stat})
            });

            data.abilities.forEach(a => {
                abilities.push(a.ability.name)
            });

            for(const p in data.sprites){
                if(typeof data.sprites[p] === 'string'){
                    sprites.push(data.sprites[p])
                }
            }

            setPokemonName(data.species.name);
            setPokemonWeight(Math.floor(data.weight * 0.22));
            setPokemonHeight(Math.floor(data.height * 3.93701));
            setPokemonStats(stats);
            setPokemonTypes(types);
            setPokemonMainImg(data.sprites.other['official-artwork']['front_default']);
            setSprites(sprites)
            setPokemonAbilities(abilities)

        })
        .catch((error) => {
            setPokemonName('')
            console.log(error)
        }) 
    }

    const handleInput  = (e) => {
        setSearchName(e.target.value.toLowerCase());
    }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPokemon(searchName)

    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input className='NavInput' onChange={handleInput} value={searchName} type='text'></input>
                <button className='NavButton' type='submit'>search</button>
            </form>
            <Card name={pokemonName} weight={pokemonWeight} height={pokemonHeight} types={pokemonTypes} stats={pokemonStats} abilities={pokemonAbilities} sprites={pokemonSprites} image={pokemonMainImg} />
        </div>
    );
}

export default Navbar;
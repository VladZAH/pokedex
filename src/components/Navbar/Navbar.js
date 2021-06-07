import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './Navbar.css';
import Card from './Card/Card';


const Navbar = () => {
    // defining state
    const [notFound, setNotFound] = useState(false)
    const [autocomplete, setAutocomplete] = (useState(false))
    const [allPokemons, setAllPokemons] = useState([]);
    const [allNames, setAllNames] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [pokemonWeight, setPokemonWeight] = useState('');
    const [pokemonHeight, setPokemonHeight] = useState('');
    const [pokemonStats, setPokemonStats] = useState([]);
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonMainImg, setPokemonMainImg] = useState('');
    const [pokemonSprites, setSprites] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState([]);
    // I was trying to implement rendering 20 random pokemons before any searches,
    // but I ran out of time, this feature will be Implemented soon 
    // const randomTwentyIDs = Array(20).fill().map(() => Math.round(Math.random() * 1117));


    // load all pokemon names for autocomplete
    useEffect(() => {
        Axios.get('https://pokeapi.co/api/v2/pokemon?limit=1200')
        .then(response => {
           setAllPokemons(response.data.results)
        })
        .catch((error) => {
            console.log(error)
        })
    }, []);




    // fetching pokemon by name, then structuring and loading data to state
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
                stats.push(s.base_stat)
            });

            data.abilities.forEach(a => {
                abilities.push(a.ability.name)
            });

            for(const p in data.sprites){
                if(typeof data.sprites[p] === 'string' && sprites.length <= 5){
                    sprites.push(data.sprites[p])
                }
            }

            setPokemonName(data.species.name);
            // converting weight and height to inches and pounds 
            setPokemonWeight(Math.floor(data.weight * 0.22));
            setPokemonHeight(Math.floor(data.height * 3.93701));
            setPokemonStats(stats);
            setPokemonTypes(types);
            setPokemonMainImg(data.sprites.other['official-artwork']['front_default']);
            setSprites(sprites)
            setPokemonAbilities(abilities)
            // in case pokemon is not found
            setNotFound(false)

        })
        .catch((error) => {
            setPokemonName('')
            console.log(error)
            setNotFound(true)
        }) 
    }

    // change input in case autocomplete is clicked
    const changeInput = (e) => {
        e.preventDefault()
        setSearchName(e.currentTarget.textContent)
        setAutocomplete(false)
    }

    // handle changes toinput and autocorrect updates
    const handleInput  = (e) => {
        setSearchName(e.target.value.toLowerCase());
        let names = [];
        allPokemons.forEach((p) => {
            if(p.name.includes(searchName) && !p.name.includes('-')){
                names.push(p.name)
            }
        })
        if(names.length >= 1){
            if(names.length >= 20){
                names = names.slice(0, 20)
            }
            setAllNames(names)
            setAutocomplete(true)
        }
    }
    
    // handles form submit and trigers API call
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchPokemon(searchName)
        setAutocomplete(false)
        setSearchName('')

    }

    return(
        <div>
            <form className='formBar' onSubmit={handleSubmit}>
                <input className='NavInput' onChange={handleInput} value={searchName} type='text'></input>
                <button className='NavButton' type='submit'>search</button>
                
                    {autocomplete && <div className='AcDiv'>{allNames.map((name) => {
                        return <div onClick={changeInput} className='autocomplete' value={name} key={name}>{name}</div>
                    })}
                    </div>}
            </form>
            <Card name={pokemonName} weight={pokemonWeight} height={pokemonHeight} types={pokemonTypes} stats={pokemonStats} abilities={pokemonAbilities} sprites={pokemonSprites} image={pokemonMainImg} />
            {notFound && <p>Your pokemon in not found</p>}
        </div>
    );
}

export default Navbar;
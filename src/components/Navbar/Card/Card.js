import React from 'react';
import './Card.css';


const Card = (props) => {

const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};
const bgColor = colours[props.types[0]]

    const handleRender = () => {
        if(props.name) {
            const baseStats = props.stats.map((s) => <p className='stats' key={s.name}>{s.name}: {s.value}</p>); 
            const renderSprites = props.sprites.map((s) => <img key={s} src={s} alt='/'></img>);
            const renderAbilities = props.abilities.map((a) => <span key={a}>{a}, </span>);
            const renderTypes = props.types.map((t) => <span style={{backgroundColor: colours[t]}} key={t} className='type'>{t}</span>);
            return (
                <div className='frame'>
                    <div>
                    <span className='name'>{props.name.toUpperCase()}</span>
                    
                    {renderTypes}
                    </div>
                    <img className='mainImg'  src={props.image} alt='/'></img>
                    <div>{renderSprites}</div> 
                    <div className='info'>
                        <p>Height: {props.height}" Weight: {props.weight}lb</p>
                        <p>BASE STATS</p>
                        <div>{baseStats}</div>
                        <div>ABILITIES: {renderAbilities}</div>    
                    </div>

                </div>
            );
        } else {
            return (
                <div>
                    <p>Your pokemon in not found</p>
                </div>
            );
        }
    }
    return (
        <div> 
            {handleRender()}
        </div>
    );
} 

export default Card;
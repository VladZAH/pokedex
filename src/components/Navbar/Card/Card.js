import React from 'react';

const Card = (props) => {

    const handleRender = () => {
        if(props.name) {
            const baseStats = props.stats.map((s) => <p key={s.name}>{s.name}: {s.value}</p>); 
            const renderSprites = props.sprites.map((s) => <img key={s} src={s} alt='/'></img>);
            const renderAbilities = props.abilities.map((a) => <span key={a}>{a}, </span>);
            return (
                <div>
                    <h1>{props.name.toUpperCase()}</h1>
                    <img src={props.image} alt='/'></img>
                    <div>{renderSprites}</div> 
                    <p>Height: {props.height}" Weight: {props.weight}lb Type(s): {props.types[0]}</p>
                    <p>BASE STATS</p>
                    <div>{baseStats}</div>
                    <div>ABILITIES: {renderAbilities}</div>
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
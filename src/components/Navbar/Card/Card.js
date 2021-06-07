import React from 'react';
import './Card.css';

const Card = (props) => {

    // colours for pokemon types
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

    // colour of the card is determined by first type
    const bgColor = colours[props.types[0]]

    // destructuring basic stats array to variables for easier diagram implementation 
    const hp = props.stats[0]
    const atack = props.stats[1]
    const defence = props.stats[2]
    const spAtack = props.stats[3]
    const spDefence = props.stats[4]
    const speed = props.stats[5]

    // handler for rendering sprites, abilities and types;
    const renderSprites = props.sprites.map((s) => <img key={s} src={s} alt='/'></img>);
    const renderAbilities = props.abilities.map((a) => <span className='abillity' key={a}>{a}</span>);
    const renderTypes = props.types.map((t) => <span style={{backgroundColor: colours[t]}} key={t} className='type'>{t}</span>);

    // for stats diagrams I used percentage bars and 240 is used because maximum stat ammount is 230
    const AtackBar = {
        width: `${Math.round(atack / 240 * 100)}%`
    }
    const DefenceBar = {
        width: `${Math.round(defence / 240 * 100)}%`
    }
    const spAtackBar = {
        width: `${Math.round(spAtack / 240 * 100)}%`
    }
    const spDefenceBar = {
        width: `${Math.round(spDefence / 240 * 100)}%`
    }
    const SpeedBar = {
        width: `${Math.round(speed / 240 * 100)}%`
    }
    
    // setting gradient card background using colors from array
    const FrameBackground = {
        backgroundColor: bgColor, // for older browsers
        background: `linear-gradient(to left, #F4E2D8, ${bgColor})`
    }

    // huge function that handles proper render of the card or 'not found message'
    const handleRender = () => {
        if(props.name) {  
            return (
                <div className='frame' style={FrameBackground}>
                    <div>
                    <span className='name'>{props.name.toUpperCase()}</span>
                    <span className='hp'>HP:{hp}</span>
                    {renderTypes}
                    </div>
                    <img className='mainImg'  src={props.image} alt='/'></img>
                    <div>{renderSprites}</div> 
                    <div className='info'>
                        <p className='heightWeight'>Height: {props.height}" ------  Weight: {props.weight} lb</p>
                        <p className='stat'>Atack: {atack}</p>
                        <div className="borderBar">
                            <div className='progress' style={AtackBar}></div>
                        </div>
                        <p className='stat'>Defence: {defence}</p>
                        <div className="borderBar">
                            <div className='progress' style={DefenceBar}></div>
                        </div>
                        <p className='stat'>Special Atack: {spAtack}</p>
                        <div className="borderBar">
                            <div className='progress' style={spAtackBar}></div>
                        </div>
                        <p className='stat'>Special Defence: {spDefence}</p>
                        <div className="borderBar">
                            <div className='progress' style={spDefenceBar}></div>
                        </div>
                        <p className='stat'>Speed: {speed}</p>
                        <div className="borderBar">
                            <div className='progress' style={SpeedBar}></div>
                        </div>
                        
                        <div className='abilitiesDiv'>ABILITIES: {renderAbilities}</div>    
                    </div>

                </div>
            );
        } else {
            return (
                <div className='init'>
                    Please type the name of the pokemon You wish to see and press 'search' or 'return' 
                </div>
            );
        }
    }
    // actual render of the card by calling function above
    return (
        <div> 
            {handleRender()}
        </div>
    );
} 

export default Card;
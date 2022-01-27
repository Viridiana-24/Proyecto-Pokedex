import './App.css';
import { useEffect, useState } from 'react';
import Abilities from './components/Abilities';
//import { response } from 'express';

function App() {
  const [pokemon, setPokemon]= useState({});
  const [search, setSearch] = useState("");
  const [buttonPopup,setButtonPopup]= useState(false);
  

  const fetchPokemon = (id) => {                            
    fetch(` https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) =>response.json())                
      .then((data) => setPokemon(data));                   
  };

  const getRandomInt = (min = 1, max = 500) => {
    return Math.floor(Math.random() * (max - min) + min);         

  }

  const getNext=(min=1,max=600)=>{
    if(pokemon.id >=max){
      return pokemon.id = min;
    } else{
      return pokemon.id +1;
    } 
    //return pokemon.id +1;
  }

  const getBack=(min=1, max=600)=>{
    if(pokemon.id<=min){
    return pokemon.id=max;
  }else {
    return pokemon.id - 1 ;
  } ;
  };
  
  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setSearch("");
      })
      .catch((error) => console.log("error", error));
  };
  
  useEffect(() => {
    console.log({ pokemon });
    }, [pokemon]);
    

  return (
    <div className="App">
      <header className="App-header">
      <a className="alignCentral" href="www.github.com">Github</a>
 
        <div className="flex-container">
          <div className="d-flex">
            <form onSubmit={handleSubmit}>
              <input
                className="form-input"
                onChange={handleSearch}
                name="search"
                value={search}
              />
              <button classButton="button" type="submit">
                Buscar
              </button>
            </form>
          </div>

        <img 
          src={pokemon?.sprites?.back_default ??
            "http://pngimg.com/uploads/pokeball/pokeball_PNG9.png" 
          }
          className="poke-image" 
          alt="logo" />

        <img 
          src={pokemon?.sprites?.front_default ?? 
            "https://cdn.streamloots.com/uploads/5eb3db772a3fcd0035f7ff40/10172dc2-f05e-4804-948f-94ec8a1747ce.gif" 
          }
          className="poke-image" 
          alt="logo" />
        </div>
        
        <div className='CAJA'>
        <h3>Nombre : </h3>
        <p> {pokemon.name ?? "NO POKEMON SELECTED"} </p> 
        
        <h3>Id : </h3>
        <p> {pokemon.id} </p>
        </div>
        <div className='flex-cotainer'>
          
         
          {pokemon.id ? (
            <> 
              <button
                className="button"
                onClick={() => fetchPokemon(getBack())}> Back</button>{" "} 
                </> 
                ) : (
            
            <button className="button" onClick={() => fetchPokemon(600)}> Back
            </button>
          )}
          <button className="button" onClick={() => fetchPokemon(getRandomInt())}>Random</button>

          {pokemon.id ? (
            <>
              <button
                className="button"
                onClick={() => fetchPokemon(getNext())}>Next</button>{" "} </>) : 
          (<
            button className="button" onClick={() => fetchPokemon(1)}> Next 
          </button> )}


          <button className='button' onClick={()=>setButtonPopup(true)}>Abilities</button>
          
        </div>

        <Abilities trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>{pokemon.name}</h3>
          <ul className='text'>
             {pokemon?.abilities?.map((ability)=>(
               <li key={ability.ability.id}>
                 {ability.ability.name}
               </li>
             ))
             }
          </ul>
      </Abilities>

      </header>
    </div>
  );
}

export default App;

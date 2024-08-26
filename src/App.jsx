import { useEffect, useRef, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch'
import getRandomNumbers from './helpers/getRandomNumbers';
import LocationInfo from './components/LocationInfo';
import ResidentCard from './components/ResidentCard';
import getNumbers from './helpers/getNumbers';

function App() {
  const [locationID, setLocationID] = useState(getRandomNumbers(126)); 

  const [errorMessage, setErrorMessage] = useState('');

  const url = `https://rickandmortyapi.com/api/location/${locationID}`

  const [location, getLocation, hasError, isLoading] = useFetch(url);

  const [locations, getLocations, hasErrorLocations, isLoadingLocations] = useFetch(`https://rickandmortyapi.com/api/location/${getNumbers()}`);

  useEffect(() => {
    getLocations();
  }, [locationID]);

  useEffect(() => {
    getLocation();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault;

    const inputValue = inputName.current.value.trim();

    const selectedLocation = locations.find(
      (location) => location.name.tolowerCase() === inputValue.tolowerCase(),
    );

    if (inputId.current.value){
    setLocationID(inputId.current.value.trim());
    }

    if (inputValue) {
      setLocationID(selectedLocation ? selectedLocation.id : null);
      setErrorMessage(selectedLocation ? '' : '🛑Stop! No location found with that name! ❌');
    }
  };
  
  const inputId = useRef();

  const inputName = useRef();
  
  return (
    <div className='app flex-container'>
      <header className='app__hero'>
        <img className="hero__image" src="/img/headerr.jpg" alt="Hero Image" />
      </header>
      <section>
        <form className='form' onSubmit={handleSubmit}>
          <input className='form__input' type="number" ref={inputId} min={1} />
          <button className='form__btn'>Search for Id</button>
          <input className='form__input' type="text"  placeholder='Search location name' ref={inputName} list='locations' />
          <datalist id='locations'>
            {
              isLoadingLocations ? 
              <option></option> :
              locations?.map(location => (
                <option value={location.name} key={location.name}></option>
              ))
            }
          </datalist>
          <button className='form__btn'>Search for Name</button>
        </form>
        {isLoading ? (
          <div className="loader"></div>
        ) : hasError ? (
          <h1> 🛑Stop! You must enter Numbers from 1 to 126❌</h1>
        ) : errorMessage ? ( 
        <h1>{errorMessage}</h1>
        ) :(
          <>
            <LocationInfo location={location} />
            <section className='cards__container flex-container'>
              {location?.residents?.map((url) => (
                <ResidentCard key={url} url={url}/>
              ))}
            </section>
          </>
        )}
      </section>
    </div>
  );
}

export default App;

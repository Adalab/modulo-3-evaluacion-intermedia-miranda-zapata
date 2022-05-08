import '../styles/App.scss';
import { useState, useEffect } from 'react';
import callToApi from '../services/fetch';

function App() {
  // Variables de estado
  const [data, setData] = useState([]);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [searchQuote, setSearchQuote] = useState('');
  const [searchCharacter, setSearchCharacter] = useState('todos');

  useEffect(() => {
    callToApi().then((data) => {
      setData(data);
    });
  }, []);

  const handleNewQuote = (event) => {
    setNewQuote({
      ...newQuote,
      [event.target.id]: event.target.value,
    });
  };

  const handleClickAdd = (event) => {
    event.preventDefault();
    if (newQuote.quote !== '' || newQuote.character !== '') {
      setData([...data, newQuote]);
      setNewQuote({
        quote: '',
        character: '',
      });
    } else {
      alert('Por favor, indica una cita y un personaje'); // Mejorable con un texto de aviso, lo sé
    }
  };

  const handleSearchQuote = (event) => {
    setSearchQuote(event.target.value);
  };

  const handleSearchCharacter = (event) => {
    setSearchCharacter(event.target.value);
  };

  const htmlData = data
    // Double search by quote and character
    .filter((quote) => {
      return quote.quote.toLowerCase().includes(searchQuote.toLowerCase());
    })
    .filter((quote) => {
      if (searchCharacter === 'todos') {
        return true;
      }
      return quote.character
        .toLowerCase()
        .includes(searchCharacter.toLowerCase());
    })
    .map((quote, index) => {
      return (
        <li className='quote' key={index}>
          <p className='quote__item'>{quote.quote}</p>
          <span className='quote__character'>{quote.character}</span>
        </li>
      );
    });

  return (
    <>
      <header className='header'>
        <h1 className='header__title'>F·R·I·E·N·D·S' quotes</h1>
        <form>
          <label htmlFor='searchQuote'>Search quote</label>
          <input
            className='searchQuote__input'
            autoComplete='off'
            type='search'
            name='searchQuote'
            placeholder='Did she get off the plane?'
            onChange={handleSearchQuote}
            value={searchQuote}
          />
          <label htmlFor='searchCharacter'>Character</label>
          <select
            name='searchCharacter'
            id='searchCharacter'
            onChange={handleSearchCharacter}
            value={searchCharacter}
          >
            <option value='todos'>Todos</option>
            <option value='Rachel'>Rachel</option>
            <option value='Monica'>Monica</option>
            <option value='Phoebe'>Phoebe</option>
            <option value='Joey'>Joey</option>
            <option value='Chandler'>Chandler</option>
            <option value='Ross'>Ross</option>
          </select>
        </form>
      </header>

      <ul>{htmlData}</ul>

      <main className='main'>
        <form>
          <label htmlFor='quote'>Do you know any more quotes?</label>
          <input
            className='quote__input'
            type='text'
            name='quote'
            id='quote'
            placeholder='Add quote'
            onChange={handleNewQuote}
            value={newQuote.quote}
          />
          <label htmlFor='character'>Who said it?</label>
          <input
            className='character__input'
            type='text'
            name='character'
            id='character'
            placeholder='Add character'
            onChange={handleNewQuote}
            value={newQuote.character}
          />
          <input
            className='addBtn'
            type='submit'
            value='Add new quote'
            onClick={handleClickAdd}
          />
        </form>
      </main>
    </>
  );
}

export default App;

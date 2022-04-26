import '../styles/App.scss';
import { useState } from 'react';
import quoteList from '../data/quotes.json';

function App() {
  // Para comprobar si quoteList nos trae correctamente los datos. BORRAR
  console.log(quoteList);

  // Variables de estado
  const [data, setData] = useState(quoteList);
  const [newQuote, setNewQuote] = useState({
    quote: '',
    character: '',
  });
  const [searchQuote, setSearchQuote] = useState('');

  const handleNewQuote = (event) => {
    setNewQuote({
      ...newQuote,
      [event.target.id]: event.target.value,
    });
  };

  const handleClickAdd = (event) => {
    event.preventDefault();
    setData([...data, newQuote]);
    setNewQuote({
      quote: '',
      character: '',
    });
  };

  const handleSearchQuote = (event) => {
    setSearchQuote(event.target.value);
  };

  const htmlData = data
    .filter(
      (quote) =>
        quote.quote.toLowerCase().includes(searchQuote.toLowerCase()) ||
        quote.character.toLowerCase().includes(searchQuote.toLowerCase())
    )
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
          <input
            className='searchQuote__input'
            autoComplete='off'
            type='search'
            name='searchQuote'
            placeholder='Search quote'
            onChange={handleSearchQuote}
            value={searchQuote}
          />
        </form>
      </header>

      <ul>{htmlData}</ul>

      <main className='main'>
        <form>
          <input
            className='addQuote__input'
            type='text'
            name='addQuote'
            id='addQuote'
            placeholder='Do you know any more quotes?'
            onChange={handleNewQuote}
            value={newQuote.quote}
          />
          <input
            className='addCharacter__input'
            type='text'
            name='addCharacter'
            id='addCharacter'
            placeholder='Who said it?'
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

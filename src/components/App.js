import '../styles/App.scss';
import { useState } from 'react';
import quoteList from '../data/quotes.json';

function App() {
  // Para comprobar si quoteList nos trae correctamente los datos. BORRAR
  console.log(quoteList);

  // Variables de estado
  const [data, setData] = useState(quoteList);

  const htmlData = data.map((quote, index) => (
    <li className='quote' key={index}>
      <p className='quote__item'>{quote.quote}</p>
      <span className='quote__character'>{quote.character}</span>
    </li>
  ));

  return (
    <>
      <h1>F·R·I·E·N·D·S' quotes</h1>
      <ul>{htmlData}</ul>
    </>
  );
}

export default App;

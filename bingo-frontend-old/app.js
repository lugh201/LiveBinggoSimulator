import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [number, setNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/cards')
      .then(response => setCards(response.data))
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleDrawNumber = () => {
    axios.post('http://localhost:5000/draw-number', { number })
      .then(response => {
        setCards(response.data);
        setNumber('');
      })
      .catch(error => console.error('Error drawing number:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bingo Game</h1>
        <div className="input-container">
          <input
            type="text"
            value={number}
            onChange={handleNumberChange}
            placeholder="Enter drawn number"
            className="number-input"
          />
          <button onClick={handleDrawNumber} className="draw-button">Draw Number</button>
        </div>
        <div className="cards-container">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <img src={`http://localhost:5000/${card.imagePath}`} alt={`Card ${index}`} />
              <div className="numbers">
                {card.numbers.map((row, rowIndex) => (
                  <div key={rowIndex} className="row">
                    {row.map((num, colIndex) => (
                      <div key={colIndex} className={`cell ${card.marks[rowIndex][colIndex] ? 'marked' : ''}`}>
                        {num}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

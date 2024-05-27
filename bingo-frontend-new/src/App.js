import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [number, setNumber] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cards');
      console.log('Fetched cards:', response.data); // Debugging statement
      setCards(response.data);
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError('Error fetching cards. Please try again later.');
    }
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleDrawNumber = async () => {
    try {
      const response = await axios.post('http://localhost:5000/draw-number', { number });
      console.log('Updated cards:', response.data); // Debugging statement
      setCards(response.data);
      setNumber('');
    } catch (err) {
      console.error('Error drawing number:', err);
      setError('Error drawing number. Please try again later.');
    }
  };

  const handleClearMarks = async () => {
    try {
      const response = await axios.post('http://localhost:5000/clear-marks');
      console.log('Cleared marks:', response.data); // Debugging statement
      setCards(response.data);
    } catch (err) {
      console.error('Error clearing marks:', err);
      setError('Error clearing marks. Please try again later.');
    }
  };

  const handleClearCards = async () => {
    try {
      await axios.delete('http://localhost:5000/clear-cards');
      console.log('Cleared all cards');
      setCards([]);
    } catch (err) {
      console.error('Error clearing cards:', err);
      setError('Error clearing cards. Please try again later.');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/upload-card', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCards([...cards, response.data]);
      setFile(null);
      document.getElementById('file-input').value = null; // Clear the file input
    } catch (err) {
      console.error('Error uploading card:', err);
      setError('Error uploading card. Please try again later.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bingo Game</h1>
        {error && <p className="error">{error}</p>}
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
        <div className="upload-container">
          <input
            type="file"
            onChange={handleFileChange}
            id="file-input"
            className="file-input"
          />
          <button onClick={handleUpload} className="upload-button">Upload Card</button>
        </div>
        <div className="action-buttons">
          <button onClick={handleClearMarks} className="clear-marks-button">Clear All Marks</button>
          <button onClick={handleClearCards} className="clear-cards-button">Clear All Cards</button>
        </div>
        <div className="cards-container">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <h3>Card {index + 1}</h3>
              <div className="numbers">
                {card.numbers && card.numbers.map((row, rowIndex) => (
                  <div key={rowIndex} className="row">
                    {row.map((num, colIndex) => (
                      <div key={colIndex} className={`cell ${card.marks && card.marks[rowIndex] && card.marks[rowIndex][colIndex] ? 'marked' : ''}`}>
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

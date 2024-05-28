import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [cards, setCards] = useState([]);
  const [number, setNumber] = useState('');
  const [jsonModalIsOpen, setJsonModalIsOpen] = useState(false);
  const [manualModalIsOpen, setManualModalIsOpen] = useState(false);
  const [instructionsModalIsOpen, setInstructionsModalIsOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [newCard, setNewCard] = useState({
    B: ['', '', '', '', ''],
    I: ['', '', '', '', ''],
    N: ['', '', 'FREE', '', ''],
    G: ['', '', '', '', ''],
    O: ['', '', '', '', '']
  });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cards');
      setCards(response.data);
    } catch (err) {
      console.error('Error fetching cards:', err);
    }
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleDrawNumber = async () => {
    try {
      const response = await axios.post('http://localhost:5000/draw-number', { number });
      setCards(response.data);
      setNumber('');
    } catch (err) {
      console.error('Error drawing number:', err);
    }
  };

  const handleClearMarks = async () => {
    try {
      const response = await axios.post('http://localhost:5000/clear-marks');
      setCards(response.data);
    } catch (err) {
      console.error('Error clearing marks:', err);
    }
  };

  const handleClearCards = async () => {
    try {
      await axios.delete('http://localhost:5000/clear-cards');
      setCards([]);
    } catch (err) {
      console.error('Error clearing cards:', err);
    }
  };

  const handleJsonInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleJsonSubmit = async () => {
    try {
      const parsedCards = JSON.parse(jsonInput);
      await axios.post('http://localhost:5000/upload-cards', parsedCards);
      setJsonInput('');
      setJsonModalIsOpen(false);
      fetchCards();  // Fetch the updated list of cards
    } catch (err) {
      console.error('Error uploading JSON:', err);
    }
  };

  const handleNewCardChange = (event, row, col) => {
    const updatedCard = { ...newCard };
    const columns = ['B', 'I', 'N', 'G', 'O'];
    updatedCard[columns[col]][row] = event.target.value;
    setNewCard(updatedCard);
  };

  const handleManualSubmit = async () => {
    try {
      const card = {
        imageName: 'manual-entry.jpg',
        numbers: [0, 1, 2, 3, 4].map(rowIndex => (
          ['B', 'I', 'N', 'G', 'O'].map(col => newCard[col][rowIndex])
        )),
        marks: Array(5).fill(Array(5).fill(false))
      };
      await axios.post('http://localhost:5000/upload-cards', [card]);
      setNewCard({
        B: ['', '', '', '', ''],
        I: ['', '', '', '', ''],
        N: ['', '', 'FREE', '', ''],
        G: ['', '', '', '', ''],
        O: ['', '', '', '', '']
      });
      setManualModalIsOpen(false);
      fetchCards();  // Fetch the updated list of cards
    } catch (err) {
      console.error('Error adding manual card:', err);
    }
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
        <div className="action-buttons">
          <button onClick={handleClearMarks} className="clear-marks-button">Clear All Marks</button>
          <button onClick={handleClearCards} className="clear-cards-button">Clear All Cards</button>
          <button onClick={() => setJsonModalIsOpen(true)} className="add-json-button">Add Cards via JSON</button>
          <button onClick={() => setManualModalIsOpen(true)} className="add-manual-button">Add Cards Manually</button>
          <button onClick={() => setInstructionsModalIsOpen(true)} className="instructions-button">Instructions</button>
        </div>
        <div className="cards-container">
          {cards.map((card, index) => (
            <div key={index} className="card">
              <h3>Card {index + 1}</h3>
              <div className="bingo-header">
                <span>B</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
                <span>O</span>
              </div>
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
        <Modal
          isOpen={jsonModalIsOpen}
          onRequestClose={() => setJsonModalIsOpen(false)}
          contentLabel="JSON Input Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Input JSON String</h2>
          <textarea value={jsonInput} onChange={handleJsonInputChange} className="json-input" />
          <button onClick={handleJsonSubmit} className="submit-button">Submit</button>
          <button onClick={() => setJsonModalIsOpen(false)} className="close-button">Close</button>
        </Modal>
        <Modal
          isOpen={manualModalIsOpen}
          onRequestClose={() => setManualModalIsOpen(false)}
          contentLabel="Manual Input Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Manually Add a New Card</h2>
          <div className="card">
            <div className="bingo-header">
              <span>B</span>
              <span>I</span>
              <span>N</span>
              <span>G</span>
              <span>O</span>
            </div>
            <div className="numbers">
              {[0, 1, 2, 3, 4].map((rowIndex) => (
                <div key={rowIndex} className="row">
                  {['B', 'I', 'N', 'G', 'O'].map((col, colIndex) => (
                    <input
                      key={colIndex}
                      type="text"
                      value={newCard[col][rowIndex]}
                      onChange={(e) => handleNewCardChange(e, rowIndex, colIndex)}
                      className="cell"
                      placeholder={col}
                      disabled={col === 'N' && rowIndex === 2}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleManualSubmit} className="submit-button">Submit</button>
          <button onClick={() => setManualModalIsOpen(false)} className="close-button">Close</button>
        </Modal>
        <Modal
          isOpen={instructionsModalIsOpen}
          onRequestClose={() => setInstructionsModalIsOpen(false)}
          contentLabel="Instructions Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2>Instructions for Extracting Numbers Using ChatGPT</h2>
          <p>To extract numbers from your bingo cards, you can use ChatGPT as follows:</p>
          <ol>
            <li>Take a clear photo of each bingo card.</li>
            <li>Open ChatGPT and ask: "Can you help me extract numbers from this bingo card image?"</li>
            <li>Upload the image to ChatGPT and wait for the response.</li>
            <li>Copy the JSON string provided by ChatGPT and paste it into the JSON input modal.</li>
            <li>Click "Submit" to add the cards to your bingo game.</li>
          </ol>
          <h3>Sample JSON Format</h3>
          <pre>
            {`[
  {
    "imageName": "image1.jpg",
    "numbers": [
      [15, 27, 42, 55, 72],
      [10, 29, 41, 56, 73],
      [7, 26, "FREE", 52, 64],
      [13, 21, 36, 59, 61],
      [8, 23, 32, 58, 74]
    ],
    "marks": [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false]
    ]
  }
]`}
          </pre>
          <button onClick={() => setInstructionsModalIsOpen(false)} className="close-button">Close</button>
        </Modal>
      </header>
    </div>
  );
}

export default App;

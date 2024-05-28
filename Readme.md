Sure, here is an updated `README.md` that includes instructions on setting up and running the application, as well as how to add cards via JSON and manually.

### `README.md`

```markdown
# Bingo Game Simulator

This project is a Bingo Game Simulator that allows you to manage and play Bingo games. You can add Bingo cards via JSON input or manually, draw numbers, and see the cards update in real-time.

## Features

- Add Bingo cards via JSON input
- Add Bingo cards manually
- Draw numbers and mark the cards
- Clear all marks on the cards
- Clear all cards from the game

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/bingo-game-simulator.git
cd bingo-game-simulator
```

2. Install dependencies for the backend:

```bash
cd bingo-backend
npm install
```

3. Install dependencies for the frontend:

```bash
cd ../bingo-frontend
npm install
```

4. Create a `.env` file in the `bingo-backend` directory with the following content:

```plaintext
MONGO_URI=mongodb://localhost:27017/bingo
```

5. Start the backend server:

```bash
cd ../bingo-backend
npm start
```

6. Start the frontend server:

```bash
cd ../bingo-frontend
npm start
```

The application should now be running at `http://localhost:3000`.

## Usage

### Adding Cards via JSON

1. Click the "Add Cards via JSON" button.
2. Input the JSON string in the provided textarea.
3. Click "Submit" to add the cards.

Sample JSON format:

```json
[
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
]
```

### Adding Cards Manually

1. Click the "Add Cards Manually" button.
2. Fill in the numbers for each column (B, I, N, G, O).
3. Click "Submit" to add the card.

### Drawing Numbers

1. Enter a number in the input field labeled "Enter drawn number".
2. Click the "Draw Number" button to mark the corresponding numbers on the cards.

### Clearing Marks

1. Click the "Clear All Marks" button to remove all marks from the cards.

### Clearing Cards

1. Click the "Clear All Cards" button to remove all cards from the game.

## Instructions for Extracting Numbers Using ChatGPT

To extract numbers from your Bingo cards using ChatGPT, follow these steps:

1. Take a clear photo of each Bingo card.
2. Open ChatGPT and ask: "Can you help me extract numbers from this Bingo card image?"
3. Upload the image to ChatGPT and wait for the response.
4. Copy the JSON string provided by ChatGPT and paste it into the JSON input modal.
5. Click "Submit" to add the cards to your Bingo game.

## License

This project is licensed under the MIT License.
```

By following these steps and using this README, you should be able to set up and run your Bingo Game Simulator smoothly. If you have any further questions or need additional adjustments, please let me know!
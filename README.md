# LiveBinggoSimulator
Lot of cards? Here's the app for you to automate your binggo gaming when you had plenty of cards.
# Bingo Game Web Application

This is a web application that allows users to upload bingo cards, mark numbers drawn during a game, and manage their bingo cards. The app supports functionalities such as drawing numbers, clearing marks, and clearing all cards.

## Features

- Upload bingo card images
- Display uploaded bingo cards with numbers
- Mark numbers on bingo cards as they are drawn
- Clear all marks on bingo cards
- Clear all bingo cards

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **File Upload:** Multer
- **OCR (Optical Character Recognition):** Tesseract.js (for future implementation)

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running on your machine, or access to a MongoDB instance

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-repo/bingo-game.git <name of repo>
   cd bingo-game <folder name for the repo>
   ```

2. **Install backend dependencies:**

   ```sh
   cd bingo-backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```sh
   cd ../bingo-frontend
   npm install
   ```

### Configuration

1. **MongoDB Connection:**

   Ensure MongoDB is running and accessible. The backend will connect to `mongodb://localhost:27017/bingo` by default. You can modify the connection string in `server.js` if needed.

### Running the Application

1. **Start the backend server:**

   ```sh
   cd bingo-backend
   node server.js
   ```

   The backend server will start on `http://localhost:5000`.

2. **Start the frontend application:**

   ```sh
   cd ../bingo-frontend
   npm start
   ```

   The frontend application will start on `http://localhost:3000`.

### Usage

1. **Upload a Bingo Card:**

   - Click on the "Choose File" button to select a bingo card image from your computer.
   - Click on the "Upload Card" button to upload the selected bingo card.

2. **Draw a Number:**

   - Enter the drawn number in the input field.
   - Click on the "Draw Number" button to mark the number on all uploaded bingo cards.

3. **Clear All Marks:**

   - Click on the "Clear All Marks" button to remove all marks from the bingo cards.

4. **Clear All Cards:**

   - Click on the "Clear All Cards" button to remove all uploaded bingo cards.

## Project Structure

```
bingo-game/
│
├── bingo-backend/          # Backend folder
│   ├── node_modules/       # Node.js modules
│   ├── uploads/            # Folder for uploaded files
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies and scripts
│   └── package-lock.json   # Exact versions of backend dependencies
│
├── bingo-frontend/         # Frontend folder
│   ├── node_modules/       # Node.js modules
│   ├── public/             # Public files
│   ├── src/                # React source files
│   ├── package.json        # Frontend dependencies and scripts
│   └── package-lock.json   # Exact versions of frontend dependencies
│
└── README.md               # Project documentation
```

## Future Improvements

- Implement OCR functionality using Tesseract.js to automatically extract numbers from uploaded bingo card images.
- Add user authentication to manage individual user sessions and their respective bingo cards.
- Enhance the UI/UX for better usability and aesthetics.

## Contributions

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.


---

Enjoy your bingo game! If you have any questions or need further assistance, please feel free to contact us.

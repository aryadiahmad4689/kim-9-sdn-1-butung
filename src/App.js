import React, { useState, useEffect } from 'react';
import './App.css';

// Mengimpor file audio
import correctSound from './assets/correct.aac';
import wrongSound from './assets/wrong.aac';

const questions = [
    {
      question: 'Siapa pahlawan nasional yang dikenal dengan sebutan Bapak Pendidikan Indonesia?',
      choices: ['Ki Hajar Dewantara', 'Soekarno', 'Moh. Hatta', 'Jenderal Sudirman'],
      answer: 0
    },
    {
      question: 'Siapa nama penjahit bendera Merah Putih?',
      choices: ['Raden Ajeng Kartini', 'Fatmawati', 'Cut Nyak Dien', 'Martha Christina Tiahahu'],
      answer: 1
    },
    {
      question: 'Berapa hasil dari 7 + 5?',
      choices: ['10', '11', '12', '13'],
      answer: 2
    },
    {
      question: 'Apa nama bentuk geometri dengan 3 sisi?',
      choices: ['Lingkaran', 'Persegi', 'Segitiga', 'Oval'],
      answer: 2
    },
    {
      question: 'Jika Ani memiliki 5 apel dan membeli 3 lagi, berapa jumlah apel Ani sekarang?',
      choices: ['7', '8', '9', '10'],
      answer: 1
    },
    {
      question: 'Apa pekerjaan Kak Ariadi Ahmad?',
      choices: ['Dokter', 'Guru', 'Programmer', 'Polisi'],
      answer: 2
    },
    {
      question: 'Apa bahasa Inggris dari "kucing"?',
      choices: ['Dog', 'Cat', 'Bird', 'Fish'],
      answer: 1
    },
    {
      question: 'Apa arti kata "apple" dalam bahasa Indonesia?',
      choices: ['Jeruk', 'Pisang', 'Apel', 'Mangga'],
      answer: 2
    },
    {
      question: 'Siapa nama tikus terkenal di dunia kartun yang selalu memakai celana merah?',
      choices: ['Donald Duck', 'Goofy', 'Mickey Mouse', 'Tom'],
      answer: 2
    },
    {
      question: 'Apa nama karakter kartun yang hidup di nanas di bawah laut?',
      choices: ['Doraemon', 'Spongebob Squarepants', 'Patrick', 'Squidward'],
      answer: 1
    }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(questions));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswerButtonClick = (choiceIndex) => {
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;
    if (choiceIndex === correctAnswer) {
      setScore(score + 1);
      setPopupMessage('Jawaban Benar!');
      playSound(correctSound);
    } else {
      setPopupMessage('Jawaban Salah!');
      playSound(wrongSound);
    }
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < shuffledQuestions.length) {
        setCurrentQuestionIndex(nextQuestion);
      } else {
        setGameOver(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setShowPopup(false);
    setShuffledQuestions(shuffleArray(questions));
  };

  const playSound = (sound) => {
    new Audio(sound).play();
  };

  return (
    <div className="container">
      <h1>Game Tanya Jawab SDN 1 Butung</h1>
      {gameOver ? (
        <div>
          <h2>Game Selesai! Skor Anda: {score}</h2>
          <button onClick={handleRestart}>Mulai Lagi</button>
        </div>
      ) : (
        <div>
          <div id="question">{shuffledQuestions[currentQuestionIndex]?.question}</div>
          <div id="choices">
            {shuffledQuestions[currentQuestionIndex]?.choices.map((choice, index) => (
              <button
                key={index}
                className="choice"
                onClick={() => handleAnswerButtonClick(index)}
              >
                {choice}
              </button>
            ))}
          </div>
          <p id="score">Skor: {score}</p>
        </div>
      )}
      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;

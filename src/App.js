import React, { useState, useEffect } from 'react';
import './App.css'

const App = () => {
  const [country, setCountry] = useState({});
  const [guess, setGuess] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/capital');
      const data = await response.json();
      const randomCountry = data.data[Math.floor(Math.random() * data.data.length)];
      setCountry(randomCountry);
      setCorrectAnswer(randomCountry.capital);
    };
    fetchCountry();
  }, []);

  const handleGuess = (event) => {
    event.preventDefault();
    const guessLowercase = guess.toLowerCase();
    const correctAnswerLowercase = correctAnswer.toLowerCase();
    if (guessLowercase === correctAnswerLowercase) {
      alert('Correct!');
    } else {
      alert(`Incorrect. The capital of ${country.name} is ${correctAnswer}.`);
    }
    setGuess('');
  }

  return (
    <div className="container">
      <div className='formConatiner'>
      <h1 className="title">Guess the Capital!</h1>
      <p className="question">What is the capital of {country.name}?</p>
      <form className='formBox' onSubmit={handleGuess}>
        <input className="guess-input" type="text" value={guess} onChange={event => setGuess(event.target.value)} />
        <button className="check-button" type="submit">Check Answer</button>
      </form>
      </div>
    </div>
  );
}

export default App;

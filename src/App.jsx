import { useEffect, useState } from 'react';
// import { getClaudeResponse } from './ai';
import './App.css';
import { Route, Routes } from 'react-router';
import Layout from './shared/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Exercise from './features/Exercise/ExerciseList';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='exercise' element={<Exercise />} />
          <Route path='exercise/:id' element={<ExerciseDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

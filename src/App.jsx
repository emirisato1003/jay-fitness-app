import { useEffect, useState } from 'react';
// import { getClaudeResponse } from './ai';
import './App.css';
import { Route, Routes } from 'react-router';
import Layout from './Layout/Layout'
import Home from './pages/Home';
import About from './pages/About';
import ExerciseList from './features/Exercise/Exercise';
import ExerciseListDetail from './shared/ExerciseDetail/ExerciseListDetail';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='exercise' element={<ExerciseList />} />
          <Route path='exercise/:id' element={<ExerciseListDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

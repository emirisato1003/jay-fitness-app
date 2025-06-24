import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Exercises from './pages/Exercises';
import ExerciseListDetail from './features/ExerciseDetail/ExerciseListDetail';
import DetailRelatedList from './features/RelatedExercise/DetailRelatedList';
import DetailRelatedVideo from './features/RelatedExercise/DetailRelatedVideo';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='exercise' element={<Exercises />} />

          <Route path='exercise/:id' element={<ExerciseListDetail />}>
            <Route index element={<DetailRelatedVideo />} />
            <Route path='relatedLists' element={<DetailRelatedList />} />
          </Route>
          
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

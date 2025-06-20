import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ExerciseList from './pages/Exercises';
import ExerciseListDetail from './shared/ExerciseDetail/ExerciseListDetail';
import DetailRelatedVideo from './shared/RelatedExercise/DetailRelatedVideo';
import DetailRelatedList from './shared/RelatedExercise/DetailRelatedList';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='exercise' element={<ExerciseList />} />
          <Route path='exercise/:id' element={<ExerciseListDetail />}>
            <Route path='relatedVideos' element={<DetailRelatedVideo />} />
            <Route path='relatedLists' element={<DetailRelatedList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

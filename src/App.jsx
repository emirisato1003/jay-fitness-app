import { useEffect, useState } from 'react';
// import { getClaudeResponse } from './ai';
import './App.css';
import { Route, Routes } from 'react-router';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ExerciseList from './features/exercise/ExerciseList';
import ExerciseListDetail from './shared/ExerciseDetail/ExerciseListDetail';
import { fetchData, exerciseOptions } from './utils/fetchData';

const baseUrl = `https://exercisedb.p.rapidapi.com/exercises?limit=0&offset=0`;
function App() {
  const [exercisesList, setExercisesList] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const exerciseFetchData = async () => {
    const { exercises, error } = await fetchData(baseUrl, exerciseOptions, () => setIsLoading(true), () => setIsLoading(false));
    setErrorMessage(error);
    setExercisesList(exercises);
  };
  useEffect(() => {
    exerciseFetchData();
  }, []);
  const filteredExercises = bodyPart === 'all' ? exercisesList : exercisesList.filter(item => item.bodyPart === bodyPart);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='exercise' element={<ExerciseList
            exercisesList={exercisesList}
            setExercisesList={setExercisesList}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            filteredExercises={filteredExercises}
            errorMessage={errorMessage}
          />} />
          <Route path='exercise/:id' element={<ExerciseListDetail
          errorMessage={errorMessage}
          />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

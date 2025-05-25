import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { COCKTAILS } from './constants';
import Sidebar from './components/Sidebar/Sidebar';
import { Loader } from './components/Loader/Loader';
import './App.scss';

const CocktailPage = lazy(() => import('./pages/CocktailPage/CocktailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to={`/${COCKTAILS[0]}`} replace />} />
            <Route path=":cocktailName" element={<CocktailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;

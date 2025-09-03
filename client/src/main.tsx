import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import SheepsPage from './pages/sheeps.tsx';
import Goats from './pages/goats.tsx'
import Chickenandmore  from './pages/chickenandmore.tsx'
import AboutFarm from './pages/aboutFarm.tsx';
import AnimalForm from './components/AnimalRecord.tsx';
import RemoveAnimal from './components/RemoveAnimal.tsx'
import MedicalHistory from './pages/medicalHistory.tsx'
import SearchFilter from './pages/SearchFilter.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
       {
        index: true,
        element: <Navigate to="aboutFarm" replace />,
      },     
      {
        path: 'aboutFarm',
        element: < AboutFarm  />,
      },
        {
        path: 'sheeps',
        element: < SheepsPage/>,
      },
        {
        path: 'goats',
        element: < Goats/>,
      },
        {
        path: 'chickenandmore',
        element: < Chickenandmore/>,
      },
      {
      path: 'add-animal',
      element: <AnimalForm />
      },
      {
      path: 'remove-animal',
      element: < RemoveAnimal />
      },
   {
      path: 'medicalHistory',
      element: <MedicalHistory/>
      },
   {
      path: 'SearchFilter',
      element: <SearchFilter/>
      }


    ],
  },
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

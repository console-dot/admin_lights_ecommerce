import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminDashboard, LoginPage } from './pages';
import { AddState } from './context';

function App() {
  return (
    <AddState>
    <Routes>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/' element={<LoginPage/>}/>
    </Routes>
    </AddState>
  );
}

export default App;

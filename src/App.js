import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginPage';
import Navbar from './components/Navbar'
import AddClient from './pages/AddClient';
import GisDataPage from './pages/GisDataPage';

function App() {

  const isAuth = useSelector(state => state.user.currentUser.isAuth)

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path={"/"} element=<LoginForm /> />
          <Route path={"/home"} element={isAuth ? <HomePage /> : <LoginForm />} />
          <Route path={"/add"} element={isAuth ? <AddClient /> : <LoginForm />} />
          <Route path={"/2gis"} element={isAuth ? <GisDataPage /> : <LoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

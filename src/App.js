import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import UpdateRecipe from './UpdateRecipe';
import AddRecipe from './AddRecipe';
const App = () => {
  return (
    <BrowserRouter v7_startTransition={true}>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route exact element={<Home />} path="/home" />
        <Route exact element={<Signup />} path="/signup" />
        <Route exact element={<UpdateRecipe />} path="/update/:id" />
        <Route exact element={<AddRecipe />} path="/add" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

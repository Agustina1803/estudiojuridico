import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Menu from './components/Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';





function App() {


  return (
    <BrowserRouter>
    
 <div>
  <Routes>
   <Route path="/" element={<Menu role="admin"/>}/>

  </Routes>
   </div>

    </BrowserRouter>
    
  )
};

export default App;
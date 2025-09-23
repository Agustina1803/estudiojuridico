import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Boton from './components/boton'

function App() {
  

  return (
    <>
     <Boton variant='danger' onClick={()=>{alert('click')}}>hola</Boton>
    </>
  )
}

export default App

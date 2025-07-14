
import './App.css'
import Body from './pages/Body'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (
   <div>
    <Body/>
    <ToastContainer position='top-center'/>
   </div>
  )
}

export default App

// This is the main entry point of the React application.
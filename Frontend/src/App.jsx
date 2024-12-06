import { Routes ,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import { UserDataContext } from './context/userContext'
import { useContext } from 'react'

function App() {

  const ans=useContext(UserDataContext);

  console.log(ans);
  return (
    <div className=''>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/signup" element={<UserRegister/>}/>
          <Route path="/captain-login" element={<CaptainLogin/>}/>
          <Route path="/captain-signup" element={<CaptainSignUp/>}/>
        </Routes>
    </div>
  )
}

export default App

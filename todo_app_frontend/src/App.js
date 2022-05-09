import './App.css';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Alert from './components/Alert';
import { Routes, Route } from "react-router-dom"
import { useEffect } from 'react';
import { useTodoContext } from 'context/TodoContext';
import { loadTodoData, loadUserData } from 'api_requests';

function App() {
  const { setTodo, setUserData, alert } = useTodoContext();

  useEffect(()=>{
      loadTodoData().then(data=>{
          setTodo([...data])
      });
      loadUserData().then(data=>{
        console.log(data)
        setUserData({...data})
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const show_alert = ()=>{
    if(alert.message.length){
      return(
        <Alert/>
      );
    }
  }

  return (
    <div className="App">
      {show_alert()}
      <Routes>
        <Route path="/*" element={ <HomePage/> } />
        <Route path="login/*" element={ <LoginForm/> } />
        <Route path="register/*" element={ <RegisterForm/> } />
      </Routes>
      {/* <LoginForm/> */}
      {/* <HomePage/> */}
    </div>
  );
}

export default App;

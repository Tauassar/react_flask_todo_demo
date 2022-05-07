import './App.css';
import TodoForm from './components/TodoForm';
import TodoSort from './components/TodoSort';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <h1 className='title'>React/Flask Todo app</h1>
      <TodoForm/>
      <TodoSort/>
      <TodoList/>
    </div>
  );
}

export default App;

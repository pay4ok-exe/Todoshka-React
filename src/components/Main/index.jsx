import './main.css';
import AddBtn from '../../assets/add.png';
import ToDo from './ToDo';
import { useState } from 'react';

function Main() {
  const [todoList, setTodoList] = useState([]); // Initialize with an empty array

  // Function to add a new todo
  const addTodo = () => {
    const newTodo = {
      id: Date.now(), // Unique ID based on current timestamp
      isChecked: false,
      text: 'New To Do',
    };
    setTodoList([...todoList, newTodo]); // Add the new todo to the list
  };

  // Function to handle text change in a todo
  const handleTextChange = (id, newText) => {
    const updatedList = todoList.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodoList(updatedList);
  };

  // Function to toggle the checked status of a todo
  const toggleChecked = (id) => {
    const updatedList = todoList.map(todo =>
      todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    setTodoList(updatedList);
  };

  return (
    <div className="main">
      <div className="item-actions">
        <div className="control-buttons">
          <button className="btn selected">To Do</button>
          <button className="btn">Done</button>
          <button className="btn">Trash</button>
        </div>

        <button className="add-btn" onClick={addTodo}>
          <img src={AddBtn} alt="Add Button" />
        </button>
      </div>

      <div className="to-do">
        <h1 className="title">To Do</h1>
        <hr />
        <div className="to-do-list">
          {todoList.map(todo => (
            <ToDo
              key={todo.id}
              id={todo.id}
              text={todo.text}
              isChecked={todo.isChecked}
              onTextChange={handleTextChange}
              onToggleChecked={toggleChecked}
            />
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
}

export default Main;

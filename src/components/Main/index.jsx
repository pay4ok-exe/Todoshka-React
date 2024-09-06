import './main.css';
import AddBtn from '../../assets/add.png';
import ToDo from './ToDo';
import { useEffect, useState } from 'react';
import Modal from './Modal';

function Main() {
  const [todoList, setTodoList] = useState(()=>{
    
    const savedTodos = localStorage.getItem('todoList');
    return savedTodos ? JSON.parse(savedTodos) : [
    {
      id: Date.now(), // Unique ID based on current timestamp
      isChecked: false,
      done: false,
      trash: false,
      text: 'Wake up', // Use the provided text or default to 'New To Do'
    }
  ]}); // Initialize with an empty array

  

  useEffect(() => {
    // Save todos to localStorage whenever the todoList state changes
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const [isModalOpen, setIsModalOpen] = useState(false);



  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to add a new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Unique ID based on current timestamp
      isChecked: false,
      done: false,
      trash: false,
      text: text || 'New To Do', // Use the provided text or default to 'New To Do'
    };
    setTodoList([...todoList, newTodo]); // Add the new todo to the list
    closeModal(); // Close the modal after adding the todo
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

        <button className="add-btn" onClick={openModal}>
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
              done={todo.done}
              trash={todo.trash}
              isChecked={todo.isChecked}
              onTextChange={handleTextChange}
              onToggleChecked={toggleChecked}
            />
          )).reverse()}
        </div>
        <hr />
      </div>

      {/* Modal for adding new ToDo */}
      <Modal 
        show={isModalOpen} 
        handleClose={closeModal}
        handleAdd={addTodo}
      />
    </div>
  );
}

export default Main;

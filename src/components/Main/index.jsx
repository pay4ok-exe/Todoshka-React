import { useEffect, useState } from "react";
import "./main.css";
import AddBtn from "../../assets/add.svg";
import ToDo from "./ToDo";
import Modal from "./Modal";
import { useAuth } from "../../context/AuthContext";
import { 
  getTodos, 
  addTodo, 
  moveToTrash, 
  restoreTodo, 
  toggleTodoCompletion, 
  updateTodo, 
  deleteTodo 
} from "../../services/api";

function Main() {
  const [todoList, setTodoList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("To Do");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch todos when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();
        setTodoList(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching todos:', err.message);
        setError('Failed to load todos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user.isLoggedIn) {
      fetchTodos();
    } else {
      setTodoList([]);
      setLoading(false);
    }
  }, [user.isLoggedIn]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTodo = async (text) => {
    try {
      const newTodo = await addTodo(text);
      setTodoList([newTodo, ...todoList]);
      closeModal();
    } catch (err) {
      console.error('Error adding todo:', err.message);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleTextChange = async (id, newText) => {
    try {
      const updatedTodo = await updateTodo(id, { text: newText });
      const updatedList = todoList.map((todo) =>
        todo._id === id ? updatedTodo : todo
      );
      setTodoList(updatedList);
    } catch (err) {
      console.error('Error updating todo:', err.message);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleToggleChecked = async (id) => {
    try {
      const todoToUpdate = todoList.find((todo) => todo._id === id);
      const updatedTodo = await toggleTodoCompletion(id, todoToUpdate.isChecked);
      const updatedList = todoList.map((todo) =>
        todo._id === id ? updatedTodo : todo
      );
      setTodoList(updatedList);
    } catch (err) {
      console.error('Error toggling todo completion:', err.message);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredTodos = todoList.filter((todo) => {
    // For "To Do" page, show both completed and uncompleted tasks, but not trashed ones
    if (selectedFilter === "To Do") return !todo.trash;
    // "Trash" page shows only trashed items
    if (selectedFilter === "Trash") return todo.trash;
    return true;
  });

  const handleMoveToTrash = async (id) => {
    try {
      const updatedTodo = await moveToTrash(id);
      const updatedList = todoList.map((todo) =>
        todo._id === id ? updatedTodo : todo
      );
      setTodoList(updatedList);
    } catch (err) {
      console.error('Error moving todo to trash:', err.message);
      setError('Failed to move todo to trash. Please try again.');
    }
  };
  
  const handleRestoreTodo = async (id) => {
    try {
      const updatedTodo = await restoreTodo(id);
      const updatedList = todoList.map((todo) =>
        todo._id === id ? updatedTodo : todo
      );
      setTodoList(updatedList);
    } catch (err) {
      console.error('Error restoring todo:', err.message);
      setError('Failed to restore todo. Please try again.');
    }
  };

  const handleDeleteForever = async (id) => {
    try {
      await deleteTodo(id);
      const updatedList = todoList.filter((todo) => todo._id !== id);
      setTodoList(updatedList);
    } catch (err) {
      console.error('Error deleting todo:', err.message);
      setError('Failed to delete todo. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading-container">Loading todos...</div>;
  }

  return (
    <div className="main">
      {error && <div className="error-message">{error}</div>}
      
      <div className="item-actions">
        <div className="control-buttons">
          <button
            className={`btn ${selectedFilter === "To Do" ? "selected" : ""}`}
            onClick={() => handleFilterChange("To Do")}>
            To Do
          </button>
          <button
            className={`btn ${selectedFilter === "Trash" ? "selected" : ""}`}
            onClick={() => handleFilterChange("Trash")}>
            Trash
          </button>
        </div>

        <button className="add-btn" onClick={openModal}>
          <img src={AddBtn} alt="Add Button" />
        </button>
      </div>

      <div className="to-do">
        <h1 className="title">{selectedFilter}</h1>
        <hr />
        <div className="to-do-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-list">
              {user.isLoggedIn 
                ? "No items to display" 
                : "Please log in to view and manage your todos"}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <ToDo
                key={todo._id}
                id={todo._id}
                text={todo.text}
                trash={todo.trash}
                isChecked={todo.isChecked}
                onTextChange={handleTextChange}
                onToggleChecked={handleToggleChecked}
                onMoveToTrash={handleMoveToTrash}
                onRestore={handleRestoreTodo}
                onDeleteForever={handleDeleteForever}
              />
            ))
          )}
        </div>
        <hr />
      </div>
      <Modal show={isModalOpen} handleClose={closeModal} handleAdd={handleAddTodo} />
    </div>
  );
}

export default Main;
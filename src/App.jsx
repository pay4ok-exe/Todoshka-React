import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
// import Profile from './components/Profile'

function App() {
  const [currentPage, setCurrentPage] = useState('todos');
  const [user, setUser] = useState({
    name: 'User',
    email: 'user@example.com',
    isLoggedIn: true
  });

  const handleLogin = (userData) => {
    setUser({
      ...userData,
      isLoggedIn: true
    });
  };

  const handleLogout = () => {
    setUser({
      name: '',
      email: '',
      isLoggedIn: false
    });
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='App'>
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={navigateTo}
        currentPage={currentPage}
      />
      
      {currentPage === 'todos' && <Main />}
      {/* {currentPage === 'profile' && <Profile user={user} />} */}
      
      <Footer />
    </div>
  )
}

export default App
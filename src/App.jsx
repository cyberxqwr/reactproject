import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, Link, /*useNavigate*/ } from 'react-router-dom';
import './index.css'

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  //const navigate = useNavigate();

  const handleLogout = () => {
      logout();
  };

  return (
/*       <nav>
          <Link to="/">Home</Link> |
          {!isAuthenticated ? (
              <>
                  <Link to="/">Login</Link> |
                  <Link to="/">Register</Link>
              </>
          ) : (
              <>
                  <Link to="/">Dashboard</Link> |
                  <Link to="/">Favorites</Link> |
                  <span> Sveiki, {user?.email}! </span>
                  <button onClick={handleLogout}>Atsijungti</button>
              </>
          )}
      </nav> */

      <nav class="bg-bermuda shadow-xl">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between min-h-16 sm:h-16 flex-wrap gap-y-2 py-2">
    
          <div class="flex-shrink-0">
            <Link to="/" class="text-white text-2xl font-bold">
              25MIN
              </Link>
          </div>
    
          <div class="flex items-center space-x-3 sm:space-x-4"> <a href="index.html"
            class="bg-bermuda-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            aria-current="page">
              Pradžia
            </a>
            <a href="about.html"
               class="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Apie
            </a>
            <Link class="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out" to="/">Testas</Link>
            <a href="all_blogs.html"
            class="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Visi blogai
            </a>
    
            <div class="h-5 w-px bg-white/40 mx-1 sm:mx-2" aria-hidden="true"></div>
            {!isAuthenticated ? (
              <>
                  <Link to="/">Login</Link> |
                  <Link to="/">Register</Link>
              </>
          ) : (
            <>
            <a href="login.html"
               class="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Prisijungti
            </a>
            <a href="register.html"
               class="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Registruotis
            </a>
            </>
          )}
    
          </div> </div> </div> </nav>


      
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <hr />
      <Routes>
        { /*<Route path="/" element={<App />} /> */ }

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {/* <Dashboard /> */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>

              { /*<Favorites /> */ }
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>
    </div>
  );
}

export default App

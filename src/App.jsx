import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, Link } from 'react-router-dom';
import './index.css'
import LoginPage from './pages/LoginPage';
import UploadBlog from './pages/UploadBlog';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EditBlogPage from './pages/EditBlogPage';
import DeleteBlogPage from './pages/DeleteBlogPage';
import AboutPage from './pages/AboutPage';

function Footer() {

  return (

    <footer class="bg-bermuda text-white mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 justify-items-center mx-8 pt-4">
        <div class="antialiased px-24 py-4">
          <p class="lg:text-xl md:text-l sm:text-m drop-shadow">Naudinga</p>
        </div>
        <div class="antialiased px-24 py-4">
          <p class="lg:text-xl md:text-l sm:text-m drop-shadow">Sekite mus</p>
        </div>
        <div class="antialiased px-24 py-4">
          <p class="lg:text-xl md:text-l sm:text-m drop-shadow">Kontaktai</p>
        </div>
      </div>
      <p class="text-center py-4">Visos teisės priklauso Emiliui Borusui</p>
    </footer>
  );
}

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

    <nav className="bg-bermuda shadow-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-16 sm:h-16 flex-wrap gap-y-2 py-2">

          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">
              25MIN
            </Link>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">

            <Link to="/"
              className="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Pradžia
            </Link>
            <Link to="/about"
              className="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Apie
            </Link>
            <Link to="/"
              className="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Visi blogai
            </Link>

            <div className="h-5 w-px bg-white/40 mx-1 sm:mx-2" aria-hidden="true"></div>
            {!isAuthenticated ? (
              <>
                <Link to="/login"
                  className="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Prisijungti</Link>
                <Link to="/register"
                  className="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">Registruotis</Link>
              </>
            ) : (
              <>
                <Link to="/profile"
                  className="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                  Profilis
                </Link>
                <Link to="/upload"
                  className="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                  Naujas blogas
                </Link>
                <div
                  className="text-white hover:bg-bermuda-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                  onClick={handleLogout}>
                  Atsijungti
                </div>
              </>
            )}

          </div> </div> </div> </nav>



  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />
      <hr />

      <main className="flex-grow">
        <Routes>
          { /*<Route path="/" element={<App />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path='/' element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                {<UploadBlog />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                {<ProfilePage />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/editblog/:blogId"
            element={
              <ProtectedRoute>
                {<EditBlogPage />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/deleteblog/:blogId"
            element={
              <ProtectedRoute>
                {<DeleteBlogPage />}
              </ProtectedRoute>
            }
          />


          <Route path="*" element={<div>404 Not Found</div>} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App

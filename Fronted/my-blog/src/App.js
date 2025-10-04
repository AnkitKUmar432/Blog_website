
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Creators from './pages/Creators';
import Detail from './pages/Detail';
import UpdateBlog from './dashboard/UpdateBlog';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import MyBlogs from './dashboard/MyBlogs';
import Allusers from './pages/Allusers';

function App() {
  const location = useLocation();
  const HideNavbarFooter = ['/dashboard', '/login', '/register'].includes(location.pathname)

  const { blogs } = useAuth();
  // console.log(blogs);

  return (
    <div>
      {!HideNavbarFooter && <Navbar />}

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/blogs' element={<Blogs />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/creators' element={<Creators />} />
        <Route exact path='/my-blog' element={<MyBlogs/>} />
        <Route exact path='/users' element={<Allusers/>} />

        {/* single page route */}
        <Route exact path='/blog/:id' element={<Detail />} />

        {/* update page route */}
        <Route exact path='/blog/update/:id' element={<UpdateBlog />} />

        {/* universal route */}
        <Route exact path='*' element={<NotFound />} />
      </Routes>

      {!HideNavbarFooter && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;
// chunnumunnu@233gmail.com
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Boundry from './components/ErrorBoundry/Boundry';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import Nav from './components/header/Nav';
import './index.css';

function App() {
  return (
    <>
    <Nav/>
    <ToastContainer></ToastContainer>
      {/**<Body></Body>**/}
      <Boundry>
      <Content/>
      </Boundry>
    <Footer/>
    
    </>
  );
}

export default App;

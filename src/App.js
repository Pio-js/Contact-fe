import './App.css';
import {Switch, Route} from 'react-router-dom';
import Auth from './pages/Auth';
import Contacts from './pages/Contacts';
import GetContact from './pages/GetContact';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Switch>
        <Route path='/auth'>
          <Auth/>
        </Route>
        <Route path='/contacts'>
          <Contacts/>
        </Route>
        <Route path='/getcontact'>
          <GetContact/>
        </Route>
        <Route path='/'>
          <Auth/>
        </Route>
      </Switch>
    </>
  );
}

export default App;

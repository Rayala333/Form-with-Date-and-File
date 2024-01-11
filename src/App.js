
import './App.css';
// import Forms from './components/MyForms';
import Userdata from './components/Userdata';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Error from './errcomponents/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Userdata/>}  />
          {/* <Route path='*' element={<Error/>} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Forms/> */}
      {/* <Userdata/> */}
    </div>
  );
}

export default App;

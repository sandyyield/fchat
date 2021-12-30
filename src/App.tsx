import React from 'react';
// import logo from './logo.svg';
import './App.less';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { HashRouter } from 'react-router-dom'
import { Setting } from './pages/Setting';
import { Layouts } from './layouts';
import { Home } from './pages/Home';


const debugMode = true;

function App() {
  return (
    <div className="App" >
      <HashRouter>
        <DndProvider backend={HTML5Backend}>
          {/* {!debugMode ? <Home /> : <Setting />} */}
          <Layouts />
        </DndProvider>
      </HashRouter>
    </div>
  );
}

export default App;

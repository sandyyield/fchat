// import logo from './logo.svg';
import './App.less';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { HashRouter } from 'react-router-dom'
import { Layouts } from './layouts';
// import { SetScaleRect } from './Components/SetScaleRect';
import React from 'react';


function App() {
  return (
    <React.StrictMode>
      <div className="App" >
        <HashRouter>
          <DndProvider backend={HTML5Backend}>
            <Layouts />
            {/* <SetScaleRect /> */}
          </DndProvider>
        </HashRouter>
      </div>
    </React.StrictMode>
  );
}

export default App;

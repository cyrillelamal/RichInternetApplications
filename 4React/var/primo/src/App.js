import React from 'react';
import ThreadForm from "./ThreadForm";
import Board from "./Board";

const API = 'http://localhost:8000/'  // dummy

function App() {
    return (
        <div>
            <ThreadForm api={API}/>
            <Board api={API}/>
        </div>
    );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import VoteButtonList from "./VoteButtonList";

const URL = 'https://kodaktor.ru/j/react5b_6cbf2';

class App extends React.Component{
    render() {
        return <VoteButtonList url={URL}/>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

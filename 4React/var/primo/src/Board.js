import React from "react";
import Thread from "./Thread";

class Board extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            threads: [ // Yes hardcoded threads and posts
                {id: 1, body: 'Сап, ИВТЧ, есть одна лаба', title: 'Тред с заголовком', posts: [{id: 1, body: 'БЕЗNОГИМ'}]},
                {id: 2, body: 'Кто победит ГООГ или СООС', posts: [{id: 2, body: 'Лабы этому треду'}]},
                {id: 3, body: 'Пандроический захват', posts: [{id: 3, body: 'Лифтишь в монаду!'}]}
            ],
            err: undefined  // API handling error
        }
    }

    componentDidMount() {
        fetch(this.props.api, )
            .then(res => res.json())
            .then(({threads}) => this.setState({threads}))
            .catch(reason => this.setState({err: reason}))
    }

    render() {
        return (
            <div>
                {this.state.threads.map(thread =>
                    <Thread
                        key={thread.id}
                        meta={thread}
                    />
                )}
            </div>
        )
    }
}


export default Board

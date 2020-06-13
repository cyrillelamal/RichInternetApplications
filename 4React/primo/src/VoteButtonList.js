const fetch = require('node-fetch');
import React from "react";
import VoteButton from "./VoteButton";

class VoteButtonList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            frameworks: []
        }
    }
    componentDidMount() {
        // noinspection JSUnresolvedFunction
        fetch(this.props.url)
            .then(r => r.json())
            .then(frameworks => this.setState({frameworks}))
    }

    render() {
        return (
            <div>
                {this.state.frameworks.map(f =>
                    <VoteButton title={f.title} votes={f.votes}/>
                )}
            </div>
        )
    }
}

export default VoteButtonList;

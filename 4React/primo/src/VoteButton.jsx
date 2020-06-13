import React from "react";

class VoteButton extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            votes: props.votes
        }
    }

    click() {
        const votes = this.state.votes + 1
        this.setState({votes})
    }

    render() {
        return (
            <div>
                <button onClick={this.click.bind(this)}>
                    {this.state.title}
                </button>
                <span>Голосов: {this.state.votes}</span>
            </div>
        )
    }
}

export default VoteButton;

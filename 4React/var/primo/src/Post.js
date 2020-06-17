import React from "react";


class Post extends React.Component {
    constructor(props) {
        super(props);

        const {body} = props

        this.state = {body}
    }

    render() {
        return (
            <div>
                {this.state.body}
            </div>
        )
    }
}

export default Post

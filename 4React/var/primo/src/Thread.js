import React from "react";
import Post from "./Post";

class Thread extends React.Component{
    constructor(props) {
        super(props);

        const {id, title, body, posts} = props.meta

        this.state = {id, title, body, posts}
    }

    render() {
        return (
            <div>
                {/* header */}
                {/* there would be another component */}
                <div>
                    <div>
                        {this.state.id} {this.state.title}
                    </div>
                    <div>
                        {this.state.body}
                    </div>
                </div>
                {/* last posts */}
                <div>
                    {this.state.posts.map(post =>
                        <Post
                            key={post.id}
                            body={post.body}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default Thread

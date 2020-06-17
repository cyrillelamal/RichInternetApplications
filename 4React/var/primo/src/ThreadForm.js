import React from "react";


class ThreadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            err: undefined, // isSubmitted with errors
            id: undefined   // isSubmitted
        }
    }

    handleSubmit (event) {
        if (undefined !== this.state.id) {
            // Continue with the server
            return
        }

        // TODO: catch reason treatment

        event.preventDefault()

        fetch(this.props.api)
            .then(res => res.ok ? res.json() : (function () {
                throw new Error()
            }()))
            .then(({title, body, id}) => {
                this.setState({title, body, id})
            })
            .catch(reason => this.setState({err: reason}))
    }

    // title form
    titleChange(event) {
        const title = event.currentTarget.value

        this.setState({title})
    }

    // body form
    bodyChange(event) {
        const body = event.currentTarget.value

        this.setState({body})
    }

    render() {
        return (
            <div>
                <form
                    action={this.props.api} method="post"
                    onSubmit={this.handleSubmit.bind(this)}
                >
                    <input
                        type="text" name="title"
                        value={this.state.title}
                        onChange={this.titleChange.bind(this)}
                    />
                    <textarea
                        name="body" cols="30" rows="10"
                        value={this.state.body}
                        onChange={this.bodyChange.bind(this)}
                    />
                    {/* this input decide whether the user must be redirected */}
                    {/* if form has been submitted, id is present */}
                    {/* the serve using this field will redirect user */}
                    <input type="hidden" name="id" value={this.state.id}/>
                    <button type="submit">
                        Создать тред и ворваться в него
                    </button>
                </form>
            </div>
        )
    }
}

export default ThreadForm

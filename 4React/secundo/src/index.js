const moment = require('moment')
import React from "react"
import ReactDOM from "react-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DatePicker from 'material-ui/DatePicker'
// const injectTapEventPlugin = require('react-tap-event-plugin')
// injectTapEventPlugin()

class App extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            diff: ''
        }
    }

    count (x, event) {
        const curr = moment()
        const inp = moment(event)

        const years = curr.diff(inp, 'years')
        inp.add(years, 'years')
        const months = curr.diff(inp, 'months')
        inp.add(months, 'months')
        const days = curr.diff(inp, 'days')

        const diff = `${years} ans, ${months} mois et ${days} jours de différence`

        this.setState({diff})
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <DatePicker
                        onChange={(x, e) => this.count.call(this, x, e)}
                        floatingLabelText={'Choisissez la date !'}
                        autoOk={true}
                    />
                </MuiThemeProvider>
                <h1>{this.state.diff}</h1>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

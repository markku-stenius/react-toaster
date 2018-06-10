import React from 'react'
import ReactDOM from 'react-dom'
import Toaster from './components/toaster'
import('./css/index.css')

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.toast  = {}
        this.state = {
            toast: {}
        }
        this.toastIt = this.toastIt.bind(this)
    }
    toastIt(msg, type, timeout) {
        this.toast = {
            msg: msg,
            type: type,
            timeout: timeout
        }
        this.setState({toast: this.toast})
    }
    render() {
        return(
            <div className="main-app">
                <input type="button" onClick={() => {this.toastIt("Warning toast!", "warning", 3000)}} value="warning" />
                <input type="button" onClick={() => {this.toastIt("ERROR toast!", "error", 3000)}} value="error" />
                <input type="button" onClick={() => {this.toastIt("This is a toast with a lot of text, please do not read me.", "info", 3000)}} value="Gimme a long boring text" />
                <Toaster toast={this.toast}/>
            </div>
        )
    }
}

ReactDOM.render(
    <Main />, document.getElementById('root')
)
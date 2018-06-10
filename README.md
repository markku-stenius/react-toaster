# A simple toast popup component written in React.

The idea was to create a simple toaster which would be able to flash different types of messages, errors and warnings. One possible use would be to show API request success and error messages in a low key fashion. The main inspiration was Google's material design _paper-toast_.

## How to use
We will first need to import the file:
```
import Toaster from './components/toaster'
```

Then add toast object to this.state:
```
this.toast  = {}
this.state = {
    toast: {}
}
```


We will also need a function updating the toast state, otherwise the change will not be relayed to the component. Something like this:
```
toastIt(msg, type, timeout) {
    this.toast = {
        msg: msg,
        type: type,
        timeout: timeout
    }
    this.setState({toast: this.toast})
}
```


And last, add the component to DOM. It's easier to use an object rather than separate properties:
```
<Toaster toast={this.toast}/>
```


Now, when we call the function, data is passed to Toaster. 
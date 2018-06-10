import React from 'react'
import ('../css/toaster.css')

class Toaster extends React.Component {
    constructor(props) {
        super(props)
        this.index = -1
        this.state = {
            index: this.index,
            msg: props.toast.msg,
            type: props.toast.type,
            timeout: props.toast.timeout,
        }
        this.toasts = []
        this.updateList = this.updateList.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.toast.msg !== "") {
            let newIndex = prevState.index + 1;
            return {
                index: newIndex,
                msg: nextProps.toast.msg,
                type: nextProps.toast.type,
                timeout: nextProps.toast.timeout,
            }
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.index > this.index) {
            this.toasts.push(nextState)
            this.index++
            return true
        } else {
            return false
        }
    }

    updateList(index) {
        this.toasts.splice(0, index)
    }

    render() {
        var offset = -70
        var updateList = this.updateList
        var toastList = this.toasts.map((element => {
            offset = offset+70
            return <ToastItem data={element} offset={offset} key={element.index} onUpdate={updateList.bind(this)}/>
        }))
        if (this.toasts.length !== 0) {
            return (
                <div className="toast-list">{toastList}</div>
            )
        } else {
            return null
        }
    }
}

class ToastItem extends React.Component {
    constructor(props) {
        super(props)
        this.state =  {
            index: props.data.index,
            msg: props.data.msg,
            type: props.data.type,
            timeout: props.data.timeout,
            offset: props.offset,
            hide: false
        }
        setTimeout(()=> {
            this.props.onUpdate(props.data.index)
            this.setState(
                {hide: true}
            )
        }, this.state.timeout) 
    }

    getClass(type) {
        return "toast " + type
    }

    getStyle() {
        const show = {
            opacity: 1,
            bottom: this.state.offset
        }
        const hide = {
            display: "hidden",
            bottom: this.state.offset            
        }
        return this.state.hide?hide:show
    }

    render() {
        return(
            <div className={this.getClass(this.state.type)} style={this.getStyle()}>{this.state.msg}</div>
        )
    }
}
export default Toaster
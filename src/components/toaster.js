import React from 'react'
import ('../css/toaster.css')

class Toaster extends React.Component {
    constructor(props) {
        super(props)
        this.index = -1
        this.state = {
            toast: this.props.toast,
            toastArray: []
        }
        this.updateList = this.updateList.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.toast.msg !== "") {
            let newIndex = prevState.toast.index + 1 || 0;
            return {
                toast: {
                    index: newIndex,
                    msg: nextProps.toast.msg,
                    type: nextProps.toast.type,
                    timeout: nextProps.toast.timeout,
                    stamp: Math.floor(Date.now() / 1000)
                },
            }
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.index !== this.index) {
            this.state.toastArray.push(
                {
                    index: nextState.toast.index,
                    msg: nextState.toast.msg,
                    type: nextState.toast.type,
                    timeout: nextState.toast.timeout,
                    stamp: nextState.toast.stamp
                }
            )
            this.index++
            return true
        } else {
            return false
        }
    }

    updateList(index) {
        for (let i = 0; i<this.state.toastArray.length; i++) {
            if (this.state.toastArray[i].index === index) {
                this.state.toastArray.splice(i, 1)
            }
        }
    }

    render() {
        var offset = -70
        var updateList = this.updateList
        var toastList = this.state.toastArray.map((element) => {
            offset = offset + 70
            return <ToastItem data={element} offset={offset} key={element.index} onUpdate={updateList.bind(this)}/>
        })
        if (this.state.toastArray.length !== 0) {
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
            msg: props.data.msg,
            type: props.data.type,
            timeout: props.data.timeout,
            offset: props.offset,
            hide: false,
        }

        this.show = {
            opacity: 1,
            bottom: this.state.offset
        }
        this.hide = {
            display: "hidden",
            bottom: this.state.offset            
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
        return this.state.hide?this.hide:this.show
    }

    render() {
        return(
            <div className={this.getClass(this.state.type)} style={this.getStyle()}>{this.state.msg}</div>
        )
    }
}
export default Toaster
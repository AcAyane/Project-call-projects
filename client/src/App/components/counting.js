import React , {Component} from 'react'

class Counting extends Component {

    constructor(){
        super();
        this.state={
            count:0
        }
    }

    render(){
        return(
            <div>
                <h1>You clicked {this.state.count} times</h1>
                <button onClick = {() => this.setState((prevState) => ({count : prevState.count +1}),console.log(this.state.count)) }>Click !</button>
            </div>
        )
    }
}

export default Counting;
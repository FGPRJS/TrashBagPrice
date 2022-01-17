import React from "react";
import EventBus from "../event/EventBus";

export default class Loading extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            styleName : 'toTransparent'
        }
    }

    componentDidMount(){
        EventBus.on('Loading', this.loading.bind(this));
        EventBus.on('LoadComplete', this.loadcomplete.bind(this));
    }

    componentWillUnmount(){
        EventBus.remove('Loading');
        EventBus.remove('LoadComplete');
    }

    loading(){
        console.log('loading...');

        this.setState({
            styleName : 'toVisible'
        });
    }

    loadcomplete(){
        console.log('load complete');

        this.setState({
            styleName : 'toTransparent'
        });
    }
    
    render(){
        return <div id = "LoadingWindow" className={this.state.styleName}>
            Loading...
        </div>
    }
}
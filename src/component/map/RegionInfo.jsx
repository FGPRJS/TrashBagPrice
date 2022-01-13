import React from "react";
import EventBus from "../../event/EventBus";

export default class RegionInfo extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            locationtext : "",
            visible : false
        };
    }

    onHover(event){
        let locationname = event.target;

        this.setState({
            locationtext : locationname,
            visible : true
        })
    }

    onLeave(event){
        this.setState({
            locationtext : "",
            visible : false
        })
    }

    componentDidMount(){
        EventBus.on('ElementHover',this.onHover.bind(this));
        EventBus.on('ElementLeave',this.onLeave.bind(this));
    }

    componentWillUnmount(){
        EventBus.remove('ElementHover');
        EventBus.remove('ElementLeave');
    }

    render(){
        return <div hidden = {!this.state.visible} id="RegionInfo">
            <span>{this.state.locationtext}</span>
        </div>
    }
}
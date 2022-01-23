import React from "react";
import EventBus from "../../event/EventBus";

export default class LocationInfo extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            locationtext : "",
            styleName : "toTransparent"
        };
    }

    onHover(event){
        let locationname = event.target;

        this.setState({
            locationtext : locationname,
            styleName : "toVisible"
        })
    }

    onLeave(event){
        this.setState({
            locationtext : "",
            styleName : "toTransparent"
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
        return <div id="LocationName" className={this.state.styleName + " " + "fontNanumGothic"}>
            <span>{this.state.locationtext}</span>
        </div>
    }
}
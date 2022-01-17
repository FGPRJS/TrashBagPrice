import React from "react";
import EventBus from "../../event/EventBus";

export default class PriceResult extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            styleName : 'toTransparent height_0px',
            data : {}
        }
    }

    showResultData(event){
        this.setState({
            styleName : 'toVisible height_500px',
            data : event.result
        });
    }

    closeWindow(event){
        this.setState({
            styleName : 'toTransparent height_0px',
            data : {}
        });
    }

    componentDidMount(){
        EventBus.on("ShowResultData", this.showResultData.bind(this));
        EventBus.on("RegionClick", this.closeWindow.bind(this));
        EventBus.on("NonRegionClick", this.closeWindow.bind(this));
    }

    render(){
        return <div id = "PriceResult" className={this.state.styleName}>
            
        </div>
    }
}
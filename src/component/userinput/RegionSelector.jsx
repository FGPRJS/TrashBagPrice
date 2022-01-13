import React from "react";
import EventBus from "../../event/EventBus";

export default class RegionSelector extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            styleName : 'left_n300px'
        }
    }

    RegionClicked(event){       
        this.setState({
            styleName : 'left_0px'
        })
    }

    NonRegionClicked(event){       
        this.setState({
            styleName : 'left_n300px'
        })
    }

    componentDidMount(){
        EventBus.on("RegionClick", this.RegionClicked.bind(this));
        EventBus.on("NonRegionClick", this.NonRegionClicked.bind(this));
    }

    componentWillUnmount(){
        EventBus.on("RegionClick");
        EventBus.remove("NonRegionClick");
    }


    render(){
        //return <div id= 'RegionSelectorWrapper' className = {this.state.styleName}>
        return <div id= 'RegionSelectorWrapper' className = {this.state.styleName}>

        </div>
    }
}
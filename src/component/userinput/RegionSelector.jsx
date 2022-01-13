import React from "react";
import EventBus from "../../event/EventBus";

export default class RegionSelector extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            styleName : 'left_n20'
        }
    }

    ElementClicked(event){       
        console.log("clicked");
        
        this.setState({
            styleName : 'left_0'
        })
    }

    componentDidMount(){
        EventBus.on("ElementClick", this.ElementClicked.bind(this));
    }

    componentWillUnmount(){
        EventBus.remove("ElementClick");
    }


    render(){
        return <div id= 'RegionSelectorWrapper' className = {this.state.styleName}>

        </div>
    }
}
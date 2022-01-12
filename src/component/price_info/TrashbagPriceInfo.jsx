import React from "react";
import LocationName from "../../entity/LocationName";
import EventBus from "../../event/EventBus";
import AppQueryMaker from "../communicator/AppQueryMaker";

export default class TrashbagPriceInfo extends React.Component {
   
    constructor(){
        super();
    }

    ElementClicked(event){       
        
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render(){
        return <div id="TrashbagPriceInfo">
            <h1>{this.props.commentText}</h1>
        </div>;
    }
}
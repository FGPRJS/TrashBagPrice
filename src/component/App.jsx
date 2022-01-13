import React from "react";
import AppQueryMaker from "./communicator/AppQueryMaker.js";
import Mainmap from "./map/Mainmap.jsx";
import RegionInfo from "./map/RegionInfo.jsx";
import TrashbagPriceInfo from "./price_info/TrashbagPriceInfo.jsx";
import RegionSelector from "./userinput/RegionSelector.jsx";

export default class App extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }

    render(){
        return <div id = "super_wrapper">
            <div id = "map_wrapper">
                <Mainmap/>
                <RegionSelector></RegionSelector>
                <RegionInfo></RegionInfo>
            </div>
            <TrashbagPriceInfo
                commentText = "sdfsdf"
            ></TrashbagPriceInfo>
        </div>
    }
}
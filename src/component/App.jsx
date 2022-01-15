import React from "react";
import Mainmap from "./map/Mainmap.jsx";
import RegionInfo from "./map/RegionInfo.jsx";
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
        </div>
    }
}
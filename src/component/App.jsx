import React from "react";
import Loading from "./Loading.jsx";
import LocationInfo from "./information/LocationInfo.jsx"
import Mainmap from "./map/Mainmap.jsx";

import RegionSelector from "./userinput/RegionSelector.jsx";
import PriceResult from "./information/PriceResult.jsx";

export default class App extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }

    render(){
        return <div id = "SuperWrapper">
            <div id = "MapWrapper">
                <Mainmap/>
                <RegionSelector></RegionSelector>
                <LocationInfo></LocationInfo>
            </div>

            <Loading></Loading>
            <PriceResult></PriceResult>
            
        </div>
    }
}
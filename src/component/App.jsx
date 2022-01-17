import React from "react";
import Loading from "./Loading.jsx";
import LocationInfo from "./map/LocationInfo.jsx";
import Mainmap from "./map/Mainmap.jsx";
import PriceResult from "./map/PriceResult.jsx";
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
                <LocationInfo></LocationInfo>
            </div>

            <Loading></Loading>
            <PriceResult></PriceResult>

        </div>
    }
}
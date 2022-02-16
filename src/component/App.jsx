import React from "react";
import Loading from "./Loading.jsx";
import LocationInfo from "./information/LocationInfo.jsx"
import Mainmap from "./map/Mainmap.jsx";

import RegionSelector from "./userinput/RegionSelector.jsx";
import PriceResult from "./information/PriceResult.jsx";
import MapController from "./map/MapController.jsx";
import MapControllerButton from "./map/MapControllerButton.jsx";
import TopRibbon from "./userinput/TopRibbon.jsx";
import UserNotice from "./information/UserNotice.jsx";


export default function(props){

    return <div id = "SuperWrapper">
        <div id = "MapWrapper">
            <Mainmap/>
            <RegionSelector></RegionSelector>
            <LocationInfo></LocationInfo>
        </div>

        <TopRibbon></TopRibbon>
        <UserNotice></UserNotice>
        <Loading></Loading>
        <PriceResult></PriceResult>
        <MapControllerButton></MapControllerButton>
        <MapController></MapController>
        
    </div>;
}
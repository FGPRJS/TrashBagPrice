import React from "react";
import Mainmap from "./map/Mainmap.jsx";
import TrashbagPriceInfo from "./price_info/TrashbagPriceInfo.jsx";

export default class App extends React.Component {

    render(){
        return <div id = "map_wrapper">
            <Mainmap/>
            <TrashbagPriceInfo
                commentText = "sdfsdf"
            ></TrashbagPriceInfo>
        </div>
    }
}
import React from "react";
import Mainmap from "./map/Mainmap.jsx";

export default class App extends React.Component {
    render(){
        return <div id="map_wrapper">
            <Mainmap/>
        </div>;
    }
}
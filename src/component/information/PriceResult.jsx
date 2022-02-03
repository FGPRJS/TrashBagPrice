import React, { useEffect, useState } from "react";
import EventBus from "../../event/EventBus";
import PriceDetails from "./PriceDetails.jsx";
import PriceProperty from "../../entity/PriceProperty.js";
import TrashProperty from "../../entity/TrashProperty.js";
import TypeDetails from "./TypeDetails.jsx";
import TrashType from "../../entity/TrashType.js";
import Label from "../../entity/Label.jsx";

export default function(props){
    const [style, setStyle] = useState({
        height : 0,
        transition : "0.3s"
    });
    const [className,setClassName] = useState('toTransparent');
    const [data, setData] = useState([]);

    useEffect(() => {
        EventBus.on("ShowResultData", (event) => {
            setStyle({
                height : window.innerHeight / 2,
                transition : "0.3s"
            });
            setClassName('toVisible');
            setData(event.result.response.body.items);
        });
        EventBus.on("RegionClick", () => {
            setStyle({
                height : 0,
                transition : "0.3s"
            });
            setClassName('toTransparent');
            setData([]);
        });
        EventBus.on("NonRegionClick", () => {
            setStyle({
                height : 0,
                transition : "0.3s"
            });
            setClassName('toTransparent');
            setData([]);
        });
    },[]);

    //Render
    let locationname = ""
    const childrenList = [];
    
    data.map((item, index) => {
        const children = [Label["PriceLabel"]];
        const typechildren = [Label["TagLabel"]];

        //Make locationName
        locationname = item["ctprvnNm"] + " " + item["signguNm"];


        let key = "";

        for(const property in TrashProperty){
            key += item[property];
            key += "_";
            if(item.hasOwnProperty(property)){
                typechildren.push(
                    <TypeDetails
                        key = {property}
                        src = {TrashType[item[property]]}
                        title ={item[property]}
                    ></TypeDetails>
                )
            }
        }

        for(const property in PriceProperty){
            if(item[property] != "0"){
                children.push(
                    <PriceDetails 
                        key = {property + "_" + key}
                        src = {PriceProperty[property]} 
                        value = {item[property]}>
                    </PriceDetails>)
            }
        }

        const wrapper = <div key = {key} >
            <div className = "baseBox">
                <div className = "baseflex">
                {
                    typechildren
                }
                </div>
                <div className = "baseflex">
                {
                    children
                }
                </div>
            </div>
        </div>

        childrenList.push(wrapper);
    });

    return <div id = "PriceResult" className={className}>
        <div className="fontBlackHanSans fontSize24px fontColorLight">{locationname}</div>
        <div style = {style}>
        {
            childrenList
        }
        </div>
    </div>
}
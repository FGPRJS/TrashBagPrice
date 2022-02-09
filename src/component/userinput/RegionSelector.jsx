import React, { useEffect, useState } from "react";
import RegionName from "../../entity/RegionName";
import TrashType from "../../entity/TrashType";
import EventBus from "../../event/EventBus";
import AppQueryMaker from "../communicator/AppQueryMaker";

export default function(props){
    const [regionSelectorWrapper, setRegionSelectorWrapper] = useState({
        width : window.innerWidth / 3,
        left : -window.innerWidth / 3,
        transition: '.3s'
    });
    const [locationName, setLocationName] = useState("");
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        EventBus.on("RegionClick", (event) => {
            setRegionSelectorWrapper(
            {
                width : window.innerWidth / 3,
                left: 0,
                transition: '.3s'
            });
            setLocationName(event.target);
            setRegions(RegionName[event.target]);
        }
        );
        EventBus.on("NonRegionClick", () => {
            setRegionSelectorWrapper(
                {
                    width : window.innerWidth / 3,
                    left : -window.innerWidth / 3,
                    transition: '.3s'
                });
                setLocationName("");
                setRegions([]);
        })
    },[]);

    return <div id= 'RegionSelectorWrapper' style={regionSelectorWrapper}>
    <div className="fontNanumGothic fontSize32px textCenter">{locationName}</div>
    <div className = "fontNanumGothic">시/군/구</div>
    <select id="RegionSelection" className="width100per">
    {
        regions.map((item, index) => {
            return <option key = {index} >{item}</option>
        })
    }
    </select>
    <div className = "fontNanumGothic">쓰레기 종류</div>
    <div id = "trashprposwrapper">
        <label>
            <input type="radio" id = "trashtypeChoice1"
            name="trashprpos" value="생활쓰레기"/>
            <img src = {TrashType["생활쓰레기"]} className = "trashtype" style = {{
            width : window.innerWidth / 20,
            height : window.innerWidth / 20
        }} htmlFor="trashtypeChoice1" ></img>
        </label>

        <label>
            <input type="radio" id = "trashtypeChoice2"
            name="trashprpos" value="음식물쓰레기"/>
            <img src = {TrashType["음식물쓰레기"]} className = "trashtype" style = {{
            width : window.innerWidth / 20,
            height : window.innerWidth / 20
        }} htmlFor="trashtypeChoice2" ></img>
        </label>

        <label>
            <input type="radio" id = "trashtypeChoice3" defaultChecked={true}
            name="trashprpos" value=""/>
            <img src = {TrashType["모두"]} className = "trashtype" style = {{
            width : window.innerWidth / 20,
            height : window.innerWidth / 20
        }} htmlFor="trashtypeChoice3" ></img>
        </label>
    </div>
    <button className="width100per" onClick={(event)=>{
        let newQuery = AppQueryMaker.makeBaseQuery();

        newQuery.appendConditionQuery('CTPRVN_NM',locationName);

        //Region Selector

        let selectElement = document.querySelector('#RegionSelection');

        let region = selectElement.options[selectElement.selectedIndex].value;

        newQuery.appendConditionQuery('SIGNGU_NM',region);

        //Trashprpos Selector

        const radioButtons = document.querySelectorAll('input[name="trashprpos"]');

        let selectedprpos;

        for (const radioButton of radioButtons) {
            if (radioButton.checked && radioButton.value != "") {
                selectedprpos = radioButton.value;
                newQuery.appendConditionQuery('WEIGHTED_ENVLP_PRPOS',selectedprpos);
                break;
            }
        }

        let result = newQuery.url + newQuery.getResult();

        console.log(result);

        fetch(result)
        .then(response => 
            response.json()
        )
        .then(data => {
            EventBus.dispatch("LoadComplete", {});
            EventBus.dispatch("ShowResultData", {result : data});
        })

        //Fold
        EventBus.dispatch("NonRegionClick", {});
        EventBus.dispatch("Loading", {});
    }
    }>search</button>
        </div>
}
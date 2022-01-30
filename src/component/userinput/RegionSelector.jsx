import React from "react";
import RegionName from "../../entity/RegionName";
import EventBus from "../../event/EventBus";
import AppQueryMaker from "../communicator/AppQueryMaker";

export default class RegionSelector extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            style : {
                RegionSelectorWrapper : {
                    width : window.innerWidth / 3,
                    left : -window.innerWidth / 3,
                    transition: '.3s'
                }
            },
            locationName : "",
            regions : []
        }
    }

    RegionClicked(event){
        this.setState({
            style : {
                RegionSelectorWrapper : {
                    width : window.innerWidth / 3,
                    left: 0,
                    transition: '.3s'
                }
            },
            locationName : event.target,
            regions : RegionName[event.target]
        })
    }

    temp(event){
        
    }

    NonRegionClicked(event){       
        this.setState({
            style : {
                RegionSelectorWrapper : {
                    width : window.innerWidth / 3,
                    left : -window.innerWidth / 3,
                    transition: '.3s'
                }
            },
            locationName : "",
            regions : []
        })
    }

    componentDidMount(){
        EventBus.on("RegionClick", this.RegionClicked.bind(this));
        EventBus.on("NonRegionClick", this.NonRegionClicked.bind(this));
    }

    componentWillUnmount(){
        EventBus.remove("RegionClick");
        EventBus.remove("NonRegionClick");
    }


    searchClick(event){
        let newQuery = AppQueryMaker.makeBaseQuery();

        newQuery.appendConditionQuery('CTPRVN_NM',this.state.locationName);

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

    render(){

        

        return <div id= 'RegionSelectorWrapper' className = {this.state.styleName} style={this.state.style.RegionSelectorWrapper}>
            <div className="fontNanumGothic fontSize32px textCenter">{this.state.locationName}</div>
            <div className = "fontNanumGothic">시/군/구</div>
            <select id="RegionSelection" className="width100per">
            {
                this.state.regions.map((item, index) => {
                    return <option key = {index} >{item}</option>
                })
            }
            </select>
            <div className = "fontNanumGothic">쓰레기 종류</div>
            <div id = "trashprposwrapper">
                <input type="radio" id = "trashtypeChoice1"
                name="trashprpos" value="생활쓰레기"/>
                <label className = "fontNanumGothic" htmlFor="trashtypeChoice1">생활</label>

                <input type="radio" id = "trashtypeChoice2"
                name="trashprpos" value="음식물쓰레기"/>
                <label className = "fontNanumGothic" htmlFor="trashtypeChoice2">음식물</label>

                <input type="radio" id = "trashtypeChoice3" defaultChecked={true}
                name="trashprpos" value=""/>
                <label className = "fontNanumGothic" htmlFor="trashtypeChoice3">모두</label>
            </div>
            <button className="width100per" onClick={this.searchClick.bind(this)}>search</button>
        </div>
    }
}
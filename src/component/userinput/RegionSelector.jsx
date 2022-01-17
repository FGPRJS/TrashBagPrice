import React from "react";
import RegionName from "../../entity/RegionName";
import EventBus from "../../event/EventBus";
import AppQueryMaker from "../communicator/AppQueryMaker";

export default class RegionSelector extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            styleName : 'left_n300px',
            locationName : "",
            regions : []
        }
    }

    RegionClicked(event){
        this.setState({
            styleName : 'left_0px',
            locationName : event.target,
            regions : RegionName[event.target]
        })
    }

    temp(event){
        
    }

    NonRegionClicked(event){       
        this.setState({
            styleName : 'left_n300px',
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

        fetch(result)
        .then(response => 
            response.json()
        )
        .then(data => {
            console.log(data);

            EventBus.dispatch("LoadComplete", {});
            EventBus.dispatch("ShowResultData", {result : data});
        })

        //Fold
        EventBus.dispatch("NonRegionClick", {});
        EventBus.dispatch("Loading", {});
    } 

    render(){
        return <div id= 'RegionSelectorWrapper' className = {this.state.styleName}>
            <div>{this.state.locationName}</div>
            <select id="RegionSelection">
            {
                this.state.regions.map((item, index) => {
                    return <option key = {index} >{item}</option>
                })
            }
            </select>
            <div id = "trashprposwrapper">
                <input type="radio" id = "trashtypeChoice1"
                name="trashprpos" value="생활쓰레기"/>
                <label htmlFor="trashtypeChoice1">생활</label>

                <input type="radio" id = "trashtypeChoice2"
                name="trashprpos" value="음식물쓰레기"/>
                <label htmlFor="trashtypeChoice2">음식물</label>

                <input type="radio" id = "trashtypeChoice3" defaultChecked={true}
                name="trashprpos" value=""/>
                <label htmlFor="trashtypeChoice3">모두</label>
            </div>
            <button onClick={this.searchClick.bind(this)}>search</button>
        </div>
    }
}
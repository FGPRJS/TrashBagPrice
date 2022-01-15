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
            regions : [],
            resultdata : {}
        }
    }

    RegionClicked(event){
        this.setState({
            styleName : 'left_0px',
            locationName : event.target,
            regions : RegionName[event.target],
            resultdata : {}
        })
    }

    temp(event){
        
    }

    NonRegionClicked(event){       
        this.setState({
            styleName : 'left_n300px',
            locationName : "",
            regions : [],
            resultdata : {}
        })
    }

    componentDidMount(){
        EventBus.on("RegionClick", this.RegionClicked.bind(this));
        EventBus.on("NonRegionClick", this.NonRegionClicked.bind(this));
    }

    componentWillUnmount(){
        EventBus.on("RegionClick");
        EventBus.remove("NonRegionClick");
    }


    searchClick(event){
        console.log(event);

        let selectElement = document.querySelector('#RegionSelection');

        let output = selectElement.options[selectElement.selectedIndex].value;

        let newQuery = AppQueryMaker.makeBaseQuery();

        console.log(event.target + " " + output);

        newQuery.appendConditionQuery('CTPRVN_NM',this.state.locationName);
        newQuery.appendConditionQuery('SIGNGU_NM',output);

        fetch(newQuery.url + newQuery.getResult())
        .then(response => 
            response.json()
        )
        .then(data => {
console.log(data);

            this.setState({
                resultdata : data
            })
        })

        
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
            <button onClick={this.searchClick.bind(this)}>search</button>
        </div>
    }
}
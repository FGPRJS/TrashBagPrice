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
        let newQuery = AppQueryMaker.makeBaseQuery();

        newQuery.appendConditionQuery('CTPRVN_NM',event.target);

        fetch(newQuery.url + newQuery.getResult())
        .then(response => 
            response.json()
        )
        .then(data => {
            console.log(data);
        })
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
        EventBus.on("RegionClick");
        EventBus.remove("NonRegionClick");
    }

    render(){
        return <div id= 'RegionSelectorWrapper' className = {this.state.styleName}>
            <div>{this.state.locationName}</div>
            {
                this.state.regions.map((item, index) => {
                    return <div key = {index}>{item}</div>;
                })
            }
        </div>
    }
}
import React from "react";
import EventBus from "../../event/EventBus";
import PriceDetails from "../information/PriceDetails.jsx";
import PriceProperty from "../../entity/PriceProperty.js";
import TrashProperty from "../../entity/TrashProperty.js";


export default class PriceResult extends React.Component{
    constructor(props){
        super(props);
    
        this.state = {
            styleName : 'toTransparent height_0px',
            data : []
        }
    }

    showResultData(event){
        this.setState({
            styleName : 'toVisible height_500px',
            data : event.result.response.body.items
        },() => {console.log(this.state.data)});
    }

    closeWindow(event){
        this.setState({
            styleName : 'toTransparent height_0px',
            data : []
        });
    }

    componentDidMount(){
        EventBus.on("ShowResultData", this.showResultData.bind(this));
        EventBus.on("RegionClick", this.closeWindow.bind(this));
        EventBus.on("NonRegionClick", this.closeWindow.bind(this));
    }

    render(){
        const childrenList = [];
        
        this.state.data.map((item, index) => {
            const children = [];

            let key = "";

            for(const property in TrashProperty){
                key += item[property];
                key += "_";
            }

            for(const property in PriceProperty){
                if(item[property] != "0"){
                    children.push(
                    <PriceDetails 
                        key = {property + "_" + key}
                        name = {PriceProperty[property]} 
                        value = {item[property]}>
                    </PriceDetails>)
                }
            }

            const wrapper = <div key = {key} className="baseflex">
                {
                    children
                }
            </div>

            childrenList.push(wrapper);
        });

        console.log(childrenList);

        return <div id = "PriceResult" className={this.state.styleName}>
            <div>
            {
                childrenList
            }
            </div>
        </div>
    }
}
import React from "react";
import EventBus from "../../event/EventBus";
import PriceDetails from "../information/PriceDetails.jsx";
import PriceProperty from "../../entity/PriceProperty.js";

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

        let tempkey = 9999;
        
        this.state.data.map((item, index) => {
            const children = [];

            tempkey += 1;

            let id = "";

            for(const property in item){
                if(PriceProperty.hasOwnProperty(property) && item[property] != "0"){
                    children.push(<PriceDetails key = {tempkey.toString() + "_" + index.toString()} name = {PriceProperty[property]} value = {item[property]}></PriceDetails>)
                }
            }

            const wrapper = <div key = {tempkey} className="baseflex">
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
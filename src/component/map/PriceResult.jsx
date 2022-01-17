import React from "react";
import EventBus from "../../event/EventBus";
import PriceDetails from "../information/PriceDetails.jsx";

let priceProperties = {
    "price1" : "1 리터",
    "price1Half" : "1.5 리터",
    "price2" : "2 리터",
    "price2Half" : "2.5 리터",
    "price3" : "3 리터",
    "price5" : "5 리터",
    "price10" : "10 리터",
    "price20" : "20 리터",
    "price30" : "30 리터",
    "price50" : "50 리터",
    "price60" : "60 리터",
    "price75" : "75 리터",
    "price100" : "100 리터",
    "price120" : "120 리터",
    "price125" : "125 리터",
}

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
        return <div id = "PriceResult" className={this.state.styleName}>
            <div>
            {
                this.state.data.map((item, index) => {
                    for(const property in item){
                        if(priceProperties.hasOwnProperty(property) && item[property] != "0"){
                            return <PriceDetails key = {index} name = {priceProperties[property]} value = {item[property]}></PriceDetails>
                        }
                    }
                })
            }
            </div>
        </div>
    }
}
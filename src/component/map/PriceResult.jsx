import React from "react";
import EventBus from "../../event/EventBus";
import PriceDetails from "../information/PriceDetails.jsx";
import PriceProperty from "../../entity/PriceProperty.js";
import TrashProperty from "../../entity/TrashProperty.js";
import TypeDetails from "../information/TypeDetails.jsx";
import TrashType from "../../entity/TrashType.js";
import Label from "../../entity/Label.jsx";


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
            styleName : 'toVisible toFitContent',
            data : event.result.response.body.items
        }, () => {console.log(this.state.data)});
    }

    closeWindow(event){
        this.setState({
            styleName : 'toTransparent toHeight0',
            data : []
        });
    }

    componentDidMount(){
        EventBus.on("ShowResultData", this.showResultData.bind(this));
        EventBus.on("RegionClick", this.closeWindow.bind(this));
        EventBus.on("NonRegionClick", this.closeWindow.bind(this));
    }

    render(){
        let locationname = ""
        const childrenList = [];
        
        this.state.data.map((item, index) => {
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

            const wrapper = <div key = {key}>
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

        return <div id = "PriceResult" className={this.state.styleName}>
            <div>{locationname}</div>
            <div>
            {
                childrenList
            }
            </div>
        </div>
    }
}
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
            const children = [Label["PriceLabel"]];
            const typechildren = [Label["TagLabel"]];

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
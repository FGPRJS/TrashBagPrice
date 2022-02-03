import React from "react";

import PriceLabelImg from "../../resource/Label/price.svg";
import TagLabelImg from "../../resource/Label/tag.svg";

class Label extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style : {
                width : window.innerWidth/40,
                height : window.innerHeight/20
            }
        }
    }
}

class PriceLabel extends Label{
    render(){
        return <img style = {this.state.style}  key = "PriceLabel" src = {PriceLabelImg}/>;
    }
}

class TagLabel extends Label{
    render(){
        return <img style = {this.state.style} key = "TagLabel" src = {TagLabelImg}/>
    }
}

const labels = {
    "PriceLabel" : <PriceLabel></PriceLabel>,
    "TagLabel" : <TagLabel></TagLabel>,
}
export default labels;
import React from "react";

import PriceLabelImg from "../../resource/Label/price.svg";
import TagLabelImg from "../../resource/Label/tag.svg";

class PriceLabel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style : {
                width : window.innerWidth/40,
                height : window.innerHeight/20
            }
        }
    }

    render(){
        return <img style = {this.state.style}  key = "PriceLabel" src = {PriceLabelImg}/>;
    }
}

class TagLabel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style : {
                width : window.innerWidth/40,
                height : window.innerHeight/20
            }
        }
    }

    render(){
        return <img style = {this.state.style} key = "TagLabel" src = {TagLabelImg}/>
    }
}

const Label = {
    "PriceLabel" : <PriceLabel></PriceLabel>,
    "TagLabel" : <TagLabel></TagLabel>,
}
export default Label;
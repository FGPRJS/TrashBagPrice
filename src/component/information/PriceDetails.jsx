import React from "react";

export default class PriceDetails extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <img className = "size_80_80" src = {this.props.src} alt="NO IMAGE" />
            <div className="fontBlackHanSans">{this.props.value + " 원"}</div>
        </div>
    }
}
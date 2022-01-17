import React from "react";

export default class PriceDetails extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <div>{this.props.name + " : " + this.props.value + " 원"}</div>
        </div>
    }
}
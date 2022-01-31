import React from "react";

export default class PriceDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            style : {
                width : window.innerWidth / 10,
                height : window.innerWidth / 10
            },
            fontStyle : {
                fontSize : window.innerWidth / 40,
            }
        }
    }

    render(){
        return <div className="">
            <img style = {this.state.style} src = {this.props.src} alt="NO IMAGE" />
            <div className="fontBlackHanSans fontColorLight textCenter marginCenter" style={this.state.fontStyle}>{this.props.value + " 원"}</div>
        </div>
    }
}
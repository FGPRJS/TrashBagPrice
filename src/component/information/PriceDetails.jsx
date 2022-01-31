import React from "react";

export default class PriceDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            style : {
                width : window.innerWidth / 10,
                height : window.innerWidth / 10
            }
        }
    }

    render(){
        return <div className="">
            <img style = {this.state.style} src = {this.props.src} alt="NO IMAGE" />
            <div className="fontBlackHanSans fontSize24px fontColorLight textCenter marginCenter">{this.props.value + " 원"}</div>
        </div>
    }
}
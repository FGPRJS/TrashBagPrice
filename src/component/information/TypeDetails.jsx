import React from "react";

export default class TypeDetails extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <img className = "size_80_80" src = {this.props.src} alt={"NO IMAGE"} title = {this.props.title} />
        </div>
    }
}
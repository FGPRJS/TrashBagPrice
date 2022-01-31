import React from "react";

export default class TypeDetails extends React.Component{
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
        return <div>
            <img style = {this.state.style} src = {this.props.src} alt={"NO IMAGE"} title = {this.props.title} />
        </div>
    }
}
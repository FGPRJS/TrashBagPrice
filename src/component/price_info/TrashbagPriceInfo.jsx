import React from "react";
import EventBus from "../../event/EventBus";

export default class TrashbagPriceInfo extends React.Component {
   
    ElementClicked(event){
        console.log(event);
    }

    componentDidMount(){
        EventBus.on("ElementClick", this.ElementClicked.bind(this));
    }

    componentWillUnmount(){
        EventBus.remove("ElementClick");
    }

    render(){
        const styles = {
            position: 'absolute',
            
            boxSizing:"border-box",

            bottom: '0%',
            width : '100%',
            height: '20%',


            backgroundColor: '#e3e3e3',
            border: '3px solid #676767'
        }

        return <div id="trashbag_price_info" style = {styles}>
            <h1>{this.props.commentText}</h1>
        </div>;
    }
}
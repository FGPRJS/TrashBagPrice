import React from "react";

export default class TrashbagPriceInfo extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            width : 300,
            height: 200,
            position_x : props.position_x,
            position_y : props.position_y
        }
    }

    render(){
        const styles = {
            width : `${this.state.width}px`,
            height: `${this.state.height}px`,

            position: 'absolute',
            top: this.state.position_y,
            left : this.state.position_x,

            backgroundColor: '#e3e3e3',
            border: '3px solid #676767'
        }

        return <div id="trashbag_price_info" style = {styles}>
            <span>Hello World!</span>
        </div>;
    }
}
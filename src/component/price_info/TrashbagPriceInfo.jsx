import React from "react";

export default class TrashbagPriceInfo extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            position_x : 0,
            position_y : 0
        }
    }

    render(){
        const styles = {
            width : '200px',
            height: '120px',

            z_index : 1,
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
import React from "react";

export default class TrashbagPriceInfo extends React.Component {

    constructor(props){
        super(props);
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
            <span>Hello World!</span>
        </div>;
    }
}
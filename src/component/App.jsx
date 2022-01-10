import React from "react";
import Mainmap from "./map/Mainmap.jsx";
import TrashbagPriceInfo from "./price_info/TrashbagPriceInfo.jsx";

export default class App extends React.Component {

    constructor(props){
        super(props);

        let url = 'http://api.data.go.kr/openapi/tn_pubr_public_weighted_envlp_api'; /*URL*/

        var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'WcEDPByqQrzxWt2k69nksx8Junf7GtDc8n8vGVgDz6hvbT8nvwZk4x1yYztNED3DD%2FD8%2BtiTcsKmkAUXUox%2BeQ%3D%3D'; /*Service Key*/
        queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('0'); /**/
        queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /**/
        queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /**/

        fetch(url + queryParams)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    }

    componentDidMount() {
        
    }
    componentWillUnmount() {
        
    }

    render(){
        return <div id = "map_wrapper">
            <Mainmap/>
            <TrashbagPriceInfo
                commentText = "sdfsdf"
            ></TrashbagPriceInfo>
        </div>
    }
}
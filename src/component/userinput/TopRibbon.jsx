import React, { useEffect, useState } from "react";

export default function(props){

    const [regionSelectorWrapper, setRegionSelectorWrapper] = useState({
        width : window.innerWidth / 3,
        left : -window.innerWidth / 3,
        transition: '.3s'
    });

    return <div id = "TopRibbon" className = "rowflex">
        <div className="TopRibbonItem fontBlackHanSans fontSize32px textCenter divCenter">종량제봉투 가격</div>
    </div>
}
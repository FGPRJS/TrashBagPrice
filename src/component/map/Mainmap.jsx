import React from "react";
import { ReactSVG } from "react-svg";
import map from '../../../resource/kr.svg';

export default class Mainmap extends React.Component {
    render(){
        return <ReactSVG 
        
        beforeInjection = {(inject_svg) => {
            this.svg = inject_svg;

            inject_svg.setAttribute('width',`1000`);
            inject_svg.setAttribute('height',`1200`);
        }
    }
        afterInjection = {(error, svg) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(svg);
        }
        }
        src= { map } >
            
        </ReactSVG>;
    }
}
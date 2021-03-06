import React from "react";
import { ReactSVG } from "react-svg";
import map from '../../../resource/kr.svg'
import EventBus from "../../event/EventBus";
import LocationName from "../../entity/LocationName";
import gsap from "gsap/all";

class ViewBox {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    copy(otherViewBox){
        this.x = otherViewBox.x;
        this.y = otherViewBox.y;
        this.width = otherViewBox.width;
        this.height = otherViewBox.height;
    }

    getString(){
        return [this.x, this.y, this.width, this.height].join(' ')
    }
}

function temp(props){



    return <div id = "SvgWrapper">
    <ReactSVG id = "SvgMap"
        beforeInjection = {(svg) => {
            this.svg = svg;
            svg.setAttribute('width', window.innerWidth);
            svg.setAttribute('height',window.innerHeight - 50);
            svg.setAttribute('viewBox','0 0 1200 1080');

            if (window.PointerEvent) {
                svg.addEventListener('pointerdown', this.onPointerDown.bind(this)); // Pointer is pressed
                svg.addEventListener('pointerup', this.onPointerUp.bind(this)); // Releasing the pointer
                svg.addEventListener('pointerleave', this.onPointerUp.bind(this)); // Pointer gets out of the SVG area
                svg.addEventListener('pointermove', this.onPointerMove.bind(this)); // Pointer is moving
                svg.addEventListener('wheel', this.onZoom.bind(this));
                svg.addEventListener('click', this.onClick.bind(this));
                
            } else {
                // Add all mouse events listeners fallback
                svg.addEventListener('mousedown', this.onPointerDown.bind(this)); // Pressing the mouse
                svg.addEventListener('mouseup', this.onPointerUp.bind(this)); // Releasing the mouse
                svg.addEventListener('mouseleave', this.onPointerUp.bind(this)); // Mouse gets out of the SVG area
                svg.addEventListener('mousemove', this.onPointerMove.bind(this)); // Mouse is moving

                // Add all touch events listeners fallback
                svg.addEventListener('touchstart', this.onPointerDown.bind(this)); // Finger is touching the screen
                svg.addEventListener('touchend', this.onPointerUp.bind(this)); // Finger is no longer touching the screen
                svg.addEventListener('touchmove', this.onPointerMove.bind(this)); // Finger is moving
            }
        }}

        afterInjection = {(error, svg) => {
            if (error) {
                console.error(error);
                return;
            }
            svg.classList.add('region');
            console.log(svg.classList);
        }
        }

        src = {map}
    ></ReactSVG>
</div>
}

export default class Mainmap extends React.Component {
    constructor(props){
        super(props);

        this.current_viewbox = new ViewBox(0,0,1200,1080);
        this.new_viewbox = new ViewBox(0,0,1200,1080);
        this.pointerOrigin = new ViewBox(0,0,0,0);
        this.isPointerDown = false;
        this.svg = null;
    }

    updateDimensions = () => {
        this.svg.setAttribute('width', window.innerWidth);
        this.svg.setAttribute('height',window.innerHeight - 50);
    };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        EventBus.on('MapZoomIn', () => {
            this.animatingZoom(1.1);
        });
        EventBus.on('MapZoomOut', () => {
            this.animatingZoom(0.9);
        });
        EventBus.on('MapGoLeft', () => {
            this.current_viewbox.x += 50;
            this.new_viewbox.x = this.current_viewbox.x;
            this.animatingViewBox();
        });
        EventBus.on('MapGoRight', () => {
            this.current_viewbox.x -= 50;
            this.new_viewbox.x = this.current_viewbox.x;
            this.animatingViewBox();
        });
        EventBus.on('MapGoUp', () => {
            this.current_viewbox.y += 50;
            this.new_viewbox.y = this.current_viewbox.y;
            this.animatingViewBox();
        });
        EventBus.on('MapGoDown', () => {
            this.current_viewbox.y -= 50;
            this.new_viewbox.y = this.current_viewbox.y;
            this.animatingViewBox();
        });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    getPointFromEvent (event) {
        var point = {x:0, y:0};
        // If event is triggered by a touch event, we get the position of the first finger
        if (event.targetTouches) {
        point.x = event.targetTouches[0].clientX;
        point.y = event.targetTouches[0].clientY;
        } else {
        point.x = event.clientX;
        point.y = event.clientY;
        }
        
        return point;
    }

    onPointerUp(event) {
        // The pointer is no longer considered as down
        this.isPointerDown = false;
      
        // We save the viewBox coordinates based on the last pointer offsets
        this.current_viewbox.x = this.new_viewbox.x;
        this.current_viewbox.y = this.new_viewbox.y;
      }

    // Function called by the event listeners when user start pressing/touching
    onPointerDown(event) {
        this.isPointerDown = true; // We set the pointer as down
        

        // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
        var pointerPosition = this.getPointFromEvent(event);
        this.pointerOrigin.x = pointerPosition.x;
        this.pointerOrigin.y = pointerPosition.y;
    }

     // Function called by the event listeners when user start moving/dragging
    onPointerMove (event) {

        let element = event.srcElement;  
        if(element && element.attributes['name']){
            let location = element.attributes['name'].nodeValue;

            if(LocationName.hasOwnProperty(location)){
                EventBus.dispatch("ElementHover", { target: LocationName[location]});
            }
        }
        else{
            EventBus.dispatch("ElementLeave", {});
        }

        // Only run this function if the pointer is down
        if (!this.isPointerDown) {
        return;
        }
        // This prevent user to do a selection on the page
        event.preventDefault();

        // Get the pointer position
        var pointerPosition = this.getPointFromEvent(event);

        // We calculate the distance between the pointer origin and the current position
        // The viewBox x & y values must be calculated from the original values and the distances
        this.new_viewbox.x = this.current_viewbox.x - (pointerPosition.x - this.pointerOrigin.x);
        this.new_viewbox.y = this.current_viewbox.y - (pointerPosition.y - this.pointerOrigin.y);

        this.applyViewBox();
    }

    applyViewBox(){
        // We create a string with the new viewBox values
        // The X & Y values are equal to the current viewBox minus the calculated distances
        var viewBoxString = `${this.new_viewbox.x} ${this.new_viewbox.y} ${this.new_viewbox.width} ${this.new_viewbox.height}`;
        // We apply the new viewBox values onto the SVG
        this.svg.setAttribute('viewBox', viewBoxString);
    }

    animatingViewBox(){
        gsap.to(this.svg, {
          duration: .3,
          attr: {viewBox: `${this.new_viewbox.x} ${this.new_viewbox.y} ${this.new_viewbox.width} ${this.new_viewbox.height}`},
          ease: "power3.inOut"
        });
      }

    onZoom(event){
        if(event.deltaY > 0){
          this.zoom(0.9);
        }
        else if(event.deltaY < 0){
          this.zoom(1.1);
        }
      }

    animatingZoom(div){
        this.new_viewbox.width /= div;
        this.new_viewbox.height /= div;
        this.current_viewbox.width = this.new_viewbox.width;
        this.current_viewbox.height = this.new_viewbox.height;

        this.animatingViewBox();
    }

    zoom(div){
        this.new_viewbox.width /= div;
        this.new_viewbox.height /= div;
        this.current_viewbox.width = this.new_viewbox.width;
        this.current_viewbox.height = this.new_viewbox.height;

        this.applyViewBox();
    }

    onClick(event){
    let element = event.srcElement;  
    if(element && element.attributes['name']){
        let location = element.attributes['name'].nodeValue;

        if(LocationName.hasOwnProperty(location)){
            EventBus.dispatch("RegionClick", { target: LocationName[location]});
        }
    }
    else{
        EventBus.dispatch("NonRegionClick", { target: LocationName[location]});
    }
    }

    render(){
        return <div id = "SvgWrapper">
            <ReactSVG id = "SvgMap"
                beforeInjection = {(svg) => {
                    this.svg = svg;
                    svg.setAttribute('width', window.innerWidth);
                    svg.setAttribute('height',window.innerHeight - 50);
                    svg.setAttribute('viewBox','0 0 1200 1080');

                    if (window.PointerEvent) {
                        console.log("evnttype : ptr");
                        svg.addEventListener('pointerdown', this.onPointerDown.bind(this)); // Pointer is pressed
                        svg.addEventListener('pointerup', this.onPointerUp.bind(this)); // Releasing the pointer
                        svg.addEventListener('pointerleave', this.onPointerUp.bind(this)); // Pointer gets out of the SVG area
                        svg.addEventListener('pointermove', this.onPointerMove.bind(this)); // Pointer is moving
                        svg.addEventListener('wheel', this.onZoom.bind(this));
                        svg.addEventListener('click', this.onClick.bind(this));
                        
                    } else {
                        console.log("evnttype : touch/mouse");
                        // Add all mouse events listeners fallback
                        svg.addEventListener('mousedown', this.onPointerDown.bind(this)); // Pressing the mouse
                        svg.addEventListener('mouseup', this.onPointerUp.bind(this)); // Releasing the mouse
                        svg.addEventListener('mouseleave', this.onPointerUp.bind(this)); // Mouse gets out of the SVG area
                        svg.addEventListener('mousemove', this.onPointerMove.bind(this)); // Mouse is moving

                        // Add all touch events listeners fallback
                        svg.addEventListener('touchstart', this.onPointerDown.bind(this)); // Finger is touching the screen
                        svg.addEventListener('touchend', this.onPointerUp.bind(this)); // Finger is no longer touching the screen
                        svg.addEventListener('touchmove', this.onPointerMove.bind(this)); // Finger is moving
                    }
                }}
    
                afterInjection = {(error, svg) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    svg.classList.add('region');
                    console.log(svg.classList);
                }
                }
    
                src = {map}
            ></ReactSVG>
        </div>
     }
}
import React, { useEffect, useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import EventBus from "../event/EventBus";

export default function(props){

    const [styleName, setStyleName] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        Modal.setAppElement('#SuperWrapper');
        EventBus.on('Loading', () => {
            console.log('loading...');

            setIsOpen(true);
        });
        EventBus.on('LoadComplete', () => {
            console.log('load complete');
    
            setIsOpen(false);
        });
    },[])

    return <Modal
        isOpen={isOpen}
        style = {{content : {
            marginLeft : 'auto',
            marginRight : 'auto',
            marginTop : 'auto',
            marginBottom : 'auto',

            height : '50px',
            width : '50px'
        }}}>
        <div id = "LoadingWindow" className={"material-icons md-48"}>
            loop
        </div>
    </Modal>;
}
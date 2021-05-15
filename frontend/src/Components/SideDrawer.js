import React from 'react';
import ModalDropOff from './ModalDropOff/ModalDropOff';
const SideDrawer = (props) => {
    return (
        <div>
            <ModalDropOff show = {props.showing} closeModal ={props.closeModalHandler} />
            <aside className="sidebar">
            <i class="fa fa-window-close fa-2x closeSign" aria-hidden="true" onClick={props.closeModalHandler}></i> 
                {props.children}
                
            </aside>
        </div>
    );
};

export default SideDrawer;
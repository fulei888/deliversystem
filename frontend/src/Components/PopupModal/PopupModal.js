import React from 'react';
import classes from './PopupModal.module.css'
import ModalDropOff from '../ModalDropOff/ModalDropOff' 

const PopupModal = (props) => {

    document.body.style.overflow = 'unset';
       if(props.show) {
           console.log('in')
           document.body.style.overflow = 'hidden';
       }
   
    return (
        <div >
            <ModalDropOff show = {props.show} closeModal ={props.closeModal}/>
                <div 
                    className = {classes.Modal}
                    style = {{
                        transform: props.show? 'translateY(0)' : 'translateY(-1000vh)',
                        opacity: props.show? '1' : '0',
                        
                    }}>
                        {props.children}
                </div>
               
        </div>
    )
}
export default React.memo(PopupModal, 
    (prevProps, nextProps) => 
    nextProps.show === prevProps.show && nextProps.children === prevProps.children
    );
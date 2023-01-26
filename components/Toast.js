import React, { useState, useEffect } from 'react';


const Toast = ({type, message, isActive}) => {

    const colors = {
        "success": "#47D764",
        "error": "#ff355b",
        "info": "#2F86EB",
        "warning": "#FFC021"
    }

    const icons = {
        "success": "fas fa-check-circle",
        "error": "fas fa-times-circle",
        "info": "fas fa-info-circle",
        "warning": "fas fa-exclamation-circle"
    }

    const [color, setColor] = useState(colors[type]);
    const [icon, setIcon] = useState(icons[type]);
    const [isOpen, setIsOpen] = useState(isActive);

    const toggleToast = () => {
        setIsOpen((prev) => !prev)
    }

    return (
      <div style={{display: 'flex', overflow: 'hidden'}}>
        {isOpen ? 
        <div style={{zIndex: '10', backgroundColor: '#fff' , display: 'flex', 
        justifyContent: 'space-between', alignItems: 'center', padding: '10px',
        borderLeft: `10px solid ${color}`, borderRadius: '3px', position: 'fixed',
        width: '470px', bottom: '9px', left: 0, right: 0, margin: 'auto',
        transition: '0.5s ease'}}>
            <div style={{alignSelf: 'center', fontSize: '40px', 
            color: `${color}`, margin: '0 10px'}}>
                <i className={icon}></i>
            </div>
            <div style={{marginLeft: '10px'}}>
                <div style={{color: '#000', textTransform: 'uppercase', fontWeight: '700'}}>{type}</div>
                <span style={{color: '#656565'}}>{message}</span>
            </div>
            <div style={{ alignSelf: 'flex-start', fontSize: '24px', marginLeft: '10px',
            color: '#656565', cursor: 'pointer'}} onClick={() => toggleToast()}>&times;</div>
        </div> : 
        <div style={{zIndex: '10', backgroundColor: '#fff' , display: 'flex', 
        justifyContent: 'space-between', alignItems: 'center', padding: '10px',
        borderLeft: `10px solid ${color}`, borderRadius: '3px', position: 'fixed',
        width: '470px', bottom: '-100px', left: 0, right: 0, margin: 'auto',
        transition: '0.5s ease'}}>
            <div style={{alignSelf: 'center', fontSize: '40px', 
            color: `${color}`, margin: '0 10px'}}>
                <i className={icon}></i>
            </div>
            <div style={{marginLeft: '10px'}}>
                <div style={{color: '#000', textTransform: 'uppercase', fontWeight: '700'}}>{type}</div>
                <span style={{color: '#656565'}}>{message}</span>
            </div>
            <div style={{ alignSelf: 'flex-start', fontSize: '24px', marginLeft: '10px',
            color: '#656565', cursor: 'pointer'}} onClick={() => toggleToast()}>&times;</div>
        </div>
        }
        {/* <button style={{position: 'absolute', bottom: '9px'}} onClick={() => toggleToast()}>Toast</button> */}
      </div>
    )
  }
  
  export default Toast;
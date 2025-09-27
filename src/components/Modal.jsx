import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";


export default function Modal({children, open, customClass= '', onClose}) {
    const dialog = useRef()
    useEffect(()=>{
        if (open) {
            dialog.current.showModal()
        }else{
            dialog.current.close();
        }
        
    }, [open])

    return(createPortal(<dialog ref={dialog} className={`modal ${customClass}`} onClose={onClose}>{children}</dialog>, document.getElementById("modal")))
}
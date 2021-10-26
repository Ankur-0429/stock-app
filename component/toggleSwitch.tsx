/**
 *  # ToggleSwitch.tsx
 *  This program defines the theme toggle switch. So the user can change between light and dark mode
 *  
 *  ## Authors
 *  - Ankur Ahir
 *  - Albert Lee
 */

import React from "react";
import styles from '../styles/ToggleSwitch.module.css'
import { useDispatch } from 'react-redux';
import { switchTheme } from './redux/action/index'


/**
 * 
 * @param label 
 * @param th
 * @returns 
 */
 const ToggleSwitch = () => {
    const dispatch = useDispatch()
    return (
    <div className={styles.container}>
        {" "}{" "}
        <div className={styles.toggleSwitch}>
            <input type="checkbox" className={styles.checkbox}
                name={" "} id={" "}  onClick={()=>dispatch(switchTheme())} />
            <label className={styles.label} htmlFor={" "}>
                <span className={styles.inner} />
                <span className={styles.switch} />
            </label>
        </div>
    </div>
    )
}

export default ToggleSwitch

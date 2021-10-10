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

/**
 * 
 * @param label 
 * @param th
 * @returns 
 */
const ToggleSwitch = ({label, th}) => {
    return (
    <div className={styles.container}>
        {label}{" "}
        <div className={styles.toggleSwitch}>
            <input type="checkbox" className={styles.checkbox}
                name={label} id={label}  onClick={th} />
            <label className={styles.label} htmlFor={label}>
                <span className={styles.inner} />
                <span className={styles.switch} />
            </label>
        </div>
    </div>
    )
}

export default ToggleSwitch

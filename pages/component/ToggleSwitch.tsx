import React from "react";
import styles from '../../styles/ToggleSwitch.module.css'

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

import React from "react";
import '../../styles/ToggleSwitch.module.css'

const ToggleSwitch = ({label, th}) => {
    return (
    <div className="container">
        {label}{" "}
        <div className="toggle-switch">
            <input type="checkbox" className="checkbox"
                name={label} id={label}  onClick={th} />
            <label className="label" htmlFor={label}>
                <span className="inner" />
                <span className="switch" />
            </label>
        </div>
    </div>
    )
}

export default ToggleSwitch

import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ input, label, type, options, meta: { touched, error, warning } }) => (
    <div>
        <select {...input} placeholder={label} type={type}>
            {options.map(option => (
                <option key={Math.random()} value={option}>
                    {isNaN(option) ? option.toUpperCase() : option}
                </option>
            ))}
        </select>
        {touched && (error && <span>{error}</span> || warning && <span>{warning}</span>)}
    </div>
);

SelectField.propTypes = {
    input: PropTypes.shape(),
    options: PropTypes.array,
    label: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.shape(),
};

export default SelectField;

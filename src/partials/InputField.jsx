import React from "react";
import PropTypes from "prop-types";

const InputField = ({ input, label, type, size, meta: { touched, error, warning } }) => (
    <div>
        <input {...input} placeholder={label} type={type} maxLength={size} />
        {touched && (error && <span>{error}</span> || warning && <span>{warning}</span>)}
    </div>
);

InputField.propTypes = {
    input: PropTypes.shape(),
    label: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.shape(),
    size: PropTypes.string,
};

export default InputField;

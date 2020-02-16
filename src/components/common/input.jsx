import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        placeholder={label}
        className="form-control"
        {...rest}
      />
      {error && <small className="danger">{error}</small>}
    </div>
  );
};

export default Input;

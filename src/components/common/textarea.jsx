import React from "react";

const TextArea = ({ name, error, ...rest }) => {
  return (
    <div className="form-group">
      <textarea name={name} {...rest}></textarea>
      {error && <small className="danger">{error}</small>}
    </div>
  );
};

export default TextArea;

import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import TextArea from "./textarea";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({
      errors: errors || {}
    });
    if (errors) return;
    this.doSubmit();
  };

  validateProperty = (name, value) => {
    const schema = { [name]: this.schema[name] };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    let value = input.value;
    if (input.files) {
      this.setState({
        image: input.files[0]
      });
    }
    const errors = { ...this.state.errors };
    const error = this.validateProperty(input.name, value);
    if (error) errors[input.name] = error;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = value;
    this.setState({
      data,
      errors
    });
  };

  renderButton(label) {
    return <button disabled={this.validate()}>{label}</button>;
  }

  selectField(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        options={options}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
      />
    );
  }

  inputField(name, label, type = "text", placeholder = "") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderTextArea(name, placeholder) {
    const { data, errors } = this.state;
    return (
      <TextArea
        value={data[name]}
        name={name}
        placeholder={placeholder}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;

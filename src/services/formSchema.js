import Joi from "joi-browser";

const signUpSchema = {
    name: Joi.string()
        .min(3)
        .required()
        .label("name"),
    position: Joi.string()
        .min(3)
        .required()
        .label("position"),
    email: Joi.string()
        .email()
        .required()
        .label("Email"),
    password: Joi.string()
        .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{7,50})$/)
        .error(() => {
            return {
                message: "Password must be at least 7 characters long with at least a digit"
            };
        })
}

const loginSchema = {
    email: Joi.string()
        .email()
        .required()
        .label("Email"),
    password: Joi.string()
        .min(7)
        .required()
        .label("Password")
}

const projectSchema = {
    name: Joi.string()
        .min(10)
        .required()
        .label("name"),
    owner: Joi.any()
        .required()
        .label("owner"),
    vendor: Joi.string()
        .min(20)
        .required()
        .label("vendor"),
    description: Joi.string()
        .min(20)
        .required()
        .label("description"),
    startDate: Joi.any()
        .required()
        .label("Start date"),
    endDate: Joi.any()
        .required()
        .label("End date"),
    _id: Joi.any()
}

const taskSchema = {
    taskDescription: Joi.string()
        .min(10)
        .required()
        .label("description")
}


export function getSignUpSchema() {
    return signUpSchema
}
export function getLoginSchema() {
    return loginSchema
}

export function getProjectSchema() {
    return projectSchema
}

export function getTaskSchema() {
    return taskSchema
}
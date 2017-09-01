/* @flow */
const zip = require("zippo");

export const required = (value: string) => value ? undefined : "Required";

export const maxLength = (max: number) =>
    (value: string) =>
        value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min: number) =>
    (value: string) =>
        value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const number = (value: string) =>
    value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const email = (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? "Invalid email address"
        : undefined;

export const phoneNumber = (value: string) =>
    value && !/^(\([0-9]{3}\)\s*|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/.test(value)
        ? "Invalid phone number"
        : undefined;

export const zipCode = (value: string) =>
    value && !zip.validate(value) ? "Invalid zip code" : undefined;

export const passwordVerification = (value: string, validations: Array<string>) =>
    value !== validations.password ? "Passwords do not match." : undefined;

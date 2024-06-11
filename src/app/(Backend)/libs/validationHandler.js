import { Schema } from "yup";

// /**
//  * @typedef {object} ValidatedFormResult
//  * @property {boolean} success
//  * @property {object} data
//  * @property {Error[]} errors
//  */

/**
 * @template { Schema } T
 * @param {object} param0
 * @param {T} param0.schema
 * @param {*} param0.rawData
 */
export async function validateRawData({ schema, rawData }) {
  let dataAsObject;
  if (rawData instanceof FormData) {
    dataAsObject = Object.fromEntries(rawData);
  } else {
    dataAsObject = rawData;
  }

  try {
    return {
      success: /**@type {true}*/ (true),
      data: await schema.validate(dataAsObject),
      errors: null,
    };
  } catch (error) {
    return {
      success: /**@type {false}*/ (false),
      data: null,
      errors: error.errors.toLocaleString(),
    };
  }
}

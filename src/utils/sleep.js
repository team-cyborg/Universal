/* eslint-disable no-promise-executor-return */

/**
 * 
 * @param {Number} time 
 * @returns Promise
 */
module.exports.sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
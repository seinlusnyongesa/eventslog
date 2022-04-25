//current datetime in UTC format
const t = new Date();
export const datetime = t.toUTCString();

module.exports = { datetime };

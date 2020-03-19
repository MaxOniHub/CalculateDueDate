module.exports = ({ location, msg, param, value, nestedErrors }) => {
   // Build your resulting errors however you want! String, object, whatever - it works!
   return `${param}: ${msg}`;
 };

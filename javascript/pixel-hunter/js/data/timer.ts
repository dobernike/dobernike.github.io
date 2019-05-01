export default (time) => {
  if (time < 30) {
    return `fast`;
  }
  if (time < 60) {
    return `correct`;
  }
  if (time > 60) {
    return `slow`;
  }
  return new Error(`time should be a number, but it is ${time}`);
};

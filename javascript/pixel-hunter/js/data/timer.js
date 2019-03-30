/* eslint-disable consistent-return */
const time = 40;
export default () => {
  if (time < 30) {
    return `fast`;
  }
  if (time < 60) {
    return `correct`;
  }
  if (time > 60) {
    return `slow`;
  }
};

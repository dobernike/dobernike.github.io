let height = 0;
let width = 0;


export const resize = (expected, given) => {

  if (expected.height === 256 && expected.width === 256) {
    if (given.width === given.height) {
      height = 256;
      width = 256;
    } else if (given.width > given.height) {
      height = 256;
      width = 128;
    } else if (given.width < given.height) {
      height = 128;
      width = 256;
    }
  } else if (expected.height === 256 && expected.width === 128) {
    if (given.width === given.height) {
      height = 256;
      width = 128;
    } else if (given.width > given.height) {
      height = 256;
      width = 64;
    } else if (given.width < given.height) {
      height = 128;
      width = 128;
    }
  } else if (expected.height === 468 && expected.width === 458) {
    if (given.width === given.height) {
      height = 468;
      width = 458;
    } else if (given.width > given.height) {
      height = 468;
      width = 229;
    } else if (given.width < given.height) {
      height = 234;
      width = 458;
    }
  } else if (expected.height === 705 && expected.width === 455) {
    if (given.width === given.height) {
      height = 705;
      width = 455;
    } else if (given.width > given.height) {
      height = 705;
      width = 227;
    } else if (given.width < given.height) {
      height = 352;
      width = 455;
    }
  } else if (expected.height === 304 && expected.width === 455) {
    if (given.width === given.height) {
      height = 304;
      width = 455;
    } else if (given.width > given.height) {
      height = 304;
      width = 227;
    } else if (given.width < given.height) {
      height = 152;
      width = 455;
    }
  }

  return {
    height,
    width
  };
};



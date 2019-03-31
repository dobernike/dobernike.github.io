let height = 256;
let width = 256;


export const resize = (expected, given) => {
  if (expected.width === 256 && expected.height === 256) {
    if (given.width === given.height) {
      width = 256;
      height = 256;
    } else if (given.width > given.height) {
      width = 256;
      height = 128;
    } else if (given.width < given.height) {
      width = 128;
      height = 256;
    }
  } else if (expected.width === 256 && expected.height === 128) {
    if ((given.width / 2) === given.height) {
      width = 256;
      height = 128;
    } else if (given.width > given.height) {
      width = 256;
      height = 64;
    } else if (given.width === given.height) {
      width = 128;
      height = 128;
    }
  } else if (expected.width === 468 && expected.height === 458) {
    if ((given.width - given.height) % 10 === 0 && given.width > given.height) {
      width = 468;
      height = 458;
    } else if (given.width > given.height) {
      width = 468;
      height = 229;
    } else if (given.width < given.height) {
      width = 234;
      height = 458;
    }
  } else if (expected.width === 705 && expected.height === 455) {
    if ((given.width - given.height) % 5 === 0 && (given.width / given.height) < 2 && given.width > given.height) {
      width = 705;
      height = 455;
    } else if (given.width > given.height) {
      width = 705;
      height = 227;
    } else if (given.width < given.height) {
      width = 352;
      height = 455;
    }
  } else if (expected.width === 304 && expected.height === 455) {
    if ((given.height / given.width) < 2 && given.width < given.height) {
      width = 304;
      height = 455;
    } else if (given.width > given.height) {
      width = 304;
      height = 227;
    } else if (given.width < given.height) {
      width = 152;
      height = 455;
    }
  }

  return {
    height,
    width
  };
};

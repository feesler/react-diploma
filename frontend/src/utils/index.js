export const createSearchParams = (obj) => {
  const res = new URLSearchParams();

  if (obj) {
    Object.keys(obj).forEach((key) => res.set(key, obj[key]));
  }

  return res;
};

export const createOptions = (obj) => {
  const availOptions = ['categoryId', 'q'];
  const options = {};

  if (!obj) {
    return options;
  }

  availOptions.forEach((key) => {
    if (obj[key]) {
      options[key] = obj[key];
    }
  });

  return options;
};

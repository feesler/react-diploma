/* eslint-disable import/prefer-default-export */

const availOptions = ['categoryId', 'q', 'offset'];

/**
 * Create URLSearchParams instance from specified object,
 * but skips empty values (null, '', undefined, NaN)
 */
export const createSearchParams = (obj) => {
  const res = new URLSearchParams();

  if (!obj) {
    return res;
  }

  availOptions.forEach((key) => {
    if (obj[key]) {
      res.set(key, obj[key]);
    }
  });

  return res;
};

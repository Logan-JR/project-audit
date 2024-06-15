export const parseFormData = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    const keys = key.split("[").map((k) => k.replace("]", ""));
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = value;
      } else {
        if (!acc[k]) acc[k] = {};
      }
      return acc[k];
    }, object);
  });
  return object;
};

export const objToFormData = (json) => {
  let formData = new FormData();
  for (const [key, value] of Object.entries(json)) {
    formData.append(key, value);
  }
  return formData;
};

const getFormData = (object) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
        if (key === "image") {
            formData.set(key, object[key][0]);
        } else {
            formData.set(key, object[key]);
        }
    });
    return formData;
};

export default getFormData;

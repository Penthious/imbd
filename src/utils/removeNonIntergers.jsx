export default (value, removePeriod) => {
    if (removePeriod && value.code === 'Period') {
        value.preventDefault();
    } else if ((value.keyCode > 57 || value.keyCode < 48)
        && value.code !== 'Backspace'
        && value.code !== 'Enter'
        && value.code !== 'Period'
    ) {
        value.preventDefault();
    }
};

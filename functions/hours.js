export const calculateTotalWorkingHours = (start_date, end_date) => {
    const diffMilliseconds = Math.abs(new Date(end_date) - new Date(start_date));
    const hours = Math.floor(diffMilliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((diffMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours} hours ${minutes} minutes`;
  };
  



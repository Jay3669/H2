export const generateUniqueId = () => {
     const min = 100000000000;
     const max = 999999999999;

     const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

     return randomNumber.toString();
};

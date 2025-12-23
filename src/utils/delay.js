// modules/messages/utils/dealy.js

export const delay = (ms) => {
  new Promise((resolve)=> setTimeout(resolve), ms)
};

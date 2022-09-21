const D = new Date();
const time = [D.getHours(), D.getMinutes(), D.getSeconds()];
const date = [D.getDate(), D.getMonth(), D.getFullYear()];

const today = ''.concat(time.join(':'), ' - ', date.join('/'))

console.log(`[${today}] (Info) = This is a message`)
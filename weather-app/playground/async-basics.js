console.log('Starting an application...');
setTimeout(() => {
    console.log('Inside the callback...');
}, 2000);
setTimeout(() => {
    console.log('This callback has not a timeout...');
}, 0);
console.log('Finishing the process...')
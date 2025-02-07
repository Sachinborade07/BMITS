// Task1: Write a function fetchData that simulates fetching data from a server using a callback function.
// The function should take a callback that processes the data after a delay of 2 seconds.
// Use setTimeout to simulate the server delay.
// The data should be an array of user names.
// Implement error handling in the callback function to simulate a case where the server might fail.


function fetchData(callback) {
    setTimeout(() => {
        // This ensures didFail is true when 0 is generated and false when 1 is generated.
        const didFail = Math.floor(Math.random() * 2);

        if (didFail) {
            callback("Error: Failed to fetch the data", null);
        }
        else {
            const data = ['Sachin', 'Yashodeep', 'Bhushan'];
            callback(null, data);
        }
    }, 2000);
}

fetchData((error, data) => {
    if (error) {
        console.error(error);
    }
    else {
        console.log("Fetched Data", data);
    }
});


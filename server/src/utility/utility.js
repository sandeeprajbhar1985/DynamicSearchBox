var FAILURE_COEFF = 10; // This should come from const or env file.
var MAX_SERVER_LATENCY = 200; // This should come from const or env file.

function getRandomBool(n) {
    var maxRandomCoeff = 1000;
    if (n > maxRandomCoeff) n = maxRandomCoeff;
    return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
}

const getSuggestions = (text) => {
    var pre = 'pre';
    var post = 'post';
    var results = [];
    if (getRandomBool(2)) {
        results.push(pre + text);
    }
    if (getRandomBool(2)) {
        results.push(text);
    }
    if (getRandomBool(2)) {
        results.push(text + post);
    }
    if (getRandomBool(2)) {
        results.push(pre + text + post);
    }
    return new Promise((resolve, reject) => {
        var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
        setTimeout(() => {
            if (getRandomBool(FAILURE_COEFF)) {
                reject();
            } else {
                resolve(results);
            }
        }, randomTimeout);
    });
}

export default {
    getSuggestions,
};

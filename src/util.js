exports.LETTER_TO_PRESS = window.location.hostname[0];
exports.MS = 10;
exports.SECOND = 1000;
exports.BUFFER_LENGTH = 300; // Max amount of press seconds to store - because the max stat is 5min
exports.STATS = {
                totalKeyPresses: 0,
                longestKeyPress: 0,
                keyPressesSecond: 0,
                keyPressesTenSecond: 0,
                keyPressesThirtySecond: 0,
                keyPressesMinute: 0,
                keyPressesFiveMinute: 0
            };

// Pass in a list and rate (total seconds) and it will compute the average rate you are currently on
exports.averageKeyPressRate = (keyPressesInSecond, rate) => {
    let list = (keyPressesInSecond.length > rate) ? keyPressesInSecond.slice(keyPressesInSecond.length - rate) : keyPressesInSecond;
    return +(list.reduce((total, val) => total + val) / list.length * rate).toFixed(0);
};

// Pass in a list and rate (total seconds) and it will compute the total amount you have for that rate
exports.totalKeyPressRate = (keyPressesInSecond, rate) => {
    let list = (keyPressesInSecond.length > rate) ? keyPressesInSecond.slice(keyPressesInSecond.length - rate) : keyPressesInSecond;
    return list.reduce((total, val) => total + val);
};

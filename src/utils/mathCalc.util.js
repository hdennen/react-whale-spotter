function calcMedian(lo, hi) {
    return (hi - ((hi - lo) / 2)).toFixed(2);
}

function calcMean(amount, sum) {
    return (sum / amount).toFixed(2);
}

export {calcMedian, calcMean};
function calcMedian(lo, hi) {
    return round((hi - ((hi - lo) / 2)), 5);
}

function calcMean(amount, sum) {
    return round((sum / amount), 5);
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function calcPercentage(ratioAntecedent, ratioConsequent) {
    return round(ratioAntecedent / ratioConsequent * 100, 2);
}

export {
    calcMedian,
    calcMean,
    round,
    calcPercentage
};
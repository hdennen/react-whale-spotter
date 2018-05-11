
function isGreenCandle(candle) {
    return candle.deltaPrice > 0;
}

function isRedCandle(candle) {
    return !isGreenCandle(candle);
}

function isAboveDeltaVolumeMean(candle) {
    return candle.deltaAggregateVolumeMean > 0;
}

function isAboveDeltaVolumeMedian(candle) {
    return candle.deltaAggregateVolumeMedian > 0;
}

function isBelowDeltaVolumeMean(candle) {
    return candle.deltaAggregateVolumeMean < 0;
}

function isBelowDeltaVolumeMedian(candle) {
    return candle.deltaAggregateVolumeMedian < 0;
}

function isMedianAboveMean(aggregate) {
    return aggregate.volumeMedian > aggregate.volumeMean;
}

function isBetweenMM(candle) {
    return (isAboveDeltaVolumeMean(candle) && isBelowDeltaVolumeMedian(candle)) ||
        (isAboveDeltaVolumeMedian(candle) && isBelowDeltaVolumeMean(candle));
}

function isBelowPriceMean(candle) {
    return candle.deltaAggregatePriceMean < 0;
}

function isBelowPriceMedian(candle) {
    return candle.deltaAggregatePriceMedian < 0;
}

function isBelowRangeDeltaMean(candle) {
    return candle.deltaAggregateRangeMean < 0;
}

function isBelowRangeDeltaMedian(candle) {
    return candle.deltaAggregateRangeMedian < 0;
}

function isBelowPriceDeltaMM(candle) {
    return isBelowPriceMean(candle) && isBelowPriceMedian(candle);
}

export {
    isGreenCandle,
    isRedCandle,
    isAboveDeltaVolumeMean,
    isAboveDeltaVolumeMedian,
    isBelowDeltaVolumeMean,
    isBelowDeltaVolumeMedian,
    isMedianAboveMean,
    isBetweenMM,
    isBelowPriceMean,
    isBelowPriceMedian,
    isBelowRangeDeltaMean,
    isBelowRangeDeltaMedian,
    isBelowPriceDeltaMM
};
import { calcMedian, calcMean } from '../utils/mathCalc.util';

export class VolumeDeviance {

    augmentTradingData(candles) {
        let deltaPrice;

        return candles.map((candle, index, arr) => {
            deltaPrice = +(candle.close - candle.open).toFixed(2);

            candle.deltaPrice = deltaPrice;
            candle.deltaPriceAbs = Math.abs(deltaPrice);
            candle.deltaRange = +(candle.high - candle.low).toFixed(2);

            return candle;
        });
    }

    measureAgainstAggregates(tradingData, aggregateData) {
        return tradingData.map(candle => {
           candle.deltaAggregatePriceMean = (candle.deltaPriceAbs - aggregateData.deltaPriceMean).toFixed(2);
           candle.deltaAggregatePriceMedian = (candle.deltaPriceAbs - aggregateData.deltaPriceMedian).toFixed(2);
           candle.deltaAggregateRangeMean = (candle.deltaRange - aggregateData.deltaRangeMean).toFixed(2);
           candle.deltaAggregateRangeMedian = (candle.deltaRange - aggregateData.deltaRangeMedian).toFixed(2);
           candle.deltaAggregateVolumeMean = (candle.volumefrom - aggregateData.volumeMean).toFixed(2);
           candle.deltaAggregateVolumeMedian = (candle.volumefrom - aggregateData.volumeMedian).toFixed(2);

           return candle;
        });
    }

    calcPeriodData(candles) {
        const accumulator = {
            deltaPriceUpperBound: 0,
            deltaPriceLowerBound: 99999,
            deltaPriceMedian: 0,
            deltaPriceMean: 0,
            deltaRangeUpperBound: 0,
            deltaRangeLowerBound: 99999,
            deltaRangeMedian: 0,
            deltaRangeMean: 0,
            volumeUpperBound: 0,
            volumeLowerBound: 99999,
            volumeMedian: 0,
            volumeMean: 0
        };

        const finalIndex = candles.length - 1;

        let sumDeltaPrice = 0,
            sumDeltaRange = 0,
            sumVolume = 0;

        return candles.reduce((acc, current, index) => {
            if (current.deltaPriceAbs > acc.deltaPriceUpperBound) acc.deltaPriceUpperBound = current.deltaPriceAbs;
            if (current.deltaPriceAbs < acc.deltaPriceLowerBound) acc.deltaPriceLowerBound = current.deltaPriceAbs;
            if (current.deltaRange > acc.deltaRangeUpperBound) acc.deltaRangeUpperBound = current.deltaRange;
            if (current.deltaRange < acc.deltaRangeLowerBound) acc.deltaRangeLowerBound = current.deltaRange;
            if (current.volumefrom > acc.volumeUpperBound) acc.volumeUpperBound = current.volumefrom;
            if (current.volumefrom < acc.volumeLowerBound) acc.volumeLowerBound = current.volumefrom;

            sumDeltaPrice += current.deltaPriceAbs;
            sumDeltaRange += current.deltaRange;
            sumVolume += current.volumefrom;

            if (finalIndex === index) {
                const amount = index + 1;

                acc.deltaPriceMean = calcMean(amount, sumDeltaPrice);
                acc.deltaPriceMedian = calcMedian(acc.deltaPriceLowerBound, acc.deltaPriceUpperBound);
                acc.deltaRangeMean = calcMean(amount, sumDeltaRange);
                acc.deltaRangeMedian = calcMedian(acc.deltaRangeLowerBound, acc.deltaRangeUpperBound);
                acc.volumeMean = calcMean(amount, sumVolume);
                acc.volumeMedian = calcMedian(acc.volumeLowerBound, acc.volumeUpperBound);
                acc.deltaVolume = (acc.volumeUpperBound - acc.volumeLowerBound).toFixed(2);
                acc.deltaVolumeMedianMean = (acc.volumeMedian - acc.volumeMean).toFixed(2);
            }

            return acc;

        }, accumulator);
    }
}

export default VolumeDeviance
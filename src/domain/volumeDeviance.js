import { calcMedian, calcMean, round, calcPercentage} from '../utils/mathCalc.util';

export class VolumeDeviance {

    augmentTradingData(candles) {
        let deltaPrice;

        return candles.map((candle) => {
            deltaPrice = round((candle.close - candle.open), 5);

            candle.deltaPrice = deltaPrice;
            candle.deltaPriceAbs = Math.abs(deltaPrice);
            candle.deltaRange = round((candle.high - candle.low), 5);

            return candle;
        });
    }

    measureAgainstAggregates(tradingData, aggregateData) {

        return tradingData.map(candle => {
           candle.deltaAggregatePriceMean = round((candle.deltaPriceAbs - aggregateData.deltaPriceMean), 5);
           candle.deltaAggregatePriceMedian = round((candle.deltaPriceAbs - aggregateData.deltaPriceMedian), 5);
           candle.deltaAggregateRangeMean = round((candle.deltaRange - aggregateData.deltaRangeMean), 5);
           candle.deltaAggregateRangeMedian = round((candle.deltaRange - aggregateData.deltaRangeMedian), 5);
           candle.deltaAggregateVolumeMean = round((candle.volumefrom - aggregateData.volumeMean), 5);
           candle.deltaAggregateVolumeMedian = round((candle.volumefrom - aggregateData.volumeMedian), 5);

           candle.percentageVolumeDeviationFromMedian = calcPercentage(candle.deltaAggregateVolumeMedian, aggregateData.deltaVolumeMedianToBounds);

           return candle;
        });
    }

    calcPeriodData(candles) {
        const absurdlyLargeNumber = 9999999999;
        const accumulator = {
            deltaPriceUpperBound: 0,
            deltaPriceLowerBound: absurdlyLargeNumber,
            deltaPriceMedian: 0,
            deltaPriceMean: 0,
            deltaRangeUpperBound: 0,
            deltaRangeLowerBound: absurdlyLargeNumber,
            deltaRangeMedian: 0,
            deltaRangeMean: 0,
            volumeUpperBound: 0,
            volumeLowerBound: absurdlyLargeNumber,
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
                acc.deltaVolume = round((acc.volumeUpperBound - acc.volumeLowerBound), 5);
                acc.deltaVolumeMedianMean = round((acc.volumeMedian - acc.volumeMean), 5);

                acc.deltaVolumeMeanToUpperBound = acc.volumeUpperBound - acc.volumeMean;
                acc.deltaVolumeLowerBoundToMean = acc.volumeMean - acc.volumeLowerBound;

                acc.deltaVolumeMedianToBounds = acc.volumeUpperBound - acc.volumeMedian;
            }

            return acc;

        }, accumulator);
    }
}

export default VolumeDeviance
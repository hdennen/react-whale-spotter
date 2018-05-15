import { calcMedian, calcMean, round, calcPercentage} from '../utils/mathCalc.util';
import * as candleCalc from './candleCalc';

export class VolumeDeviance {

    crunchData(jsonData) {
        const tradingData = this.augmentTradingData(jsonData);
        const aggregateData = this.calcPeriodData(tradingData.slice());
        const fullCandlesData = this.measureAgainstAggregates(tradingData.slice(), aggregateData);
        const totals = this.calcTotals(tradingData.slice());

        return { aggregateData, fullCandlesData, totals };
    }

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


    calcTotals(tradingData) {
        const accumulator = {
            totalGreenAboveVMM: 0,
            totalRedAboveVMM: 0,
            totalGreenBetweenVMM: 0,
            totalRedBetweenVMM: 0,
            totalGreenAboveVMMBelowPMM: 0,
            totalRedAboveVMMBelowPMM: 0
        };

        return tradingData.reduce((acc, candle) => {
            const volumeAboveMeanAndMedian = candleCalc.isAboveDeltaVolumeMean(candle) && candleCalc.isAboveDeltaVolumeMedian(candle),
                VolumeBetweenMeanAndMedian = candleCalc.isBetweenMM(candle),
                priceBelowPriceDeltaMM = candleCalc.isBelowPriceDeltaMM(candle);

            if (candleCalc.isGreenCandle(candle)) {
                if (volumeAboveMeanAndMedian) acc.totalGreenAboveVMM++;
                if (VolumeBetweenMeanAndMedian) acc.totalGreenBetweenVMM++;
                if (volumeAboveMeanAndMedian && priceBelowPriceDeltaMM) acc.totalGreenAboveVMMBelowPMM++;
            }

            if (candleCalc.isRedCandle(candle)) {
                if (volumeAboveMeanAndMedian) acc.totalRedAboveVMM++;
                if (VolumeBetweenMeanAndMedian) acc.totalRedBetweenVMM++;
                if (volumeAboveMeanAndMedian && priceBelowPriceDeltaMM) acc.totalRedAboveVMMBelowPMM++;
            }

            return acc;
        }, accumulator);
    }

    measureAgainstAggregates(tradingData, aggregateData) {

        return tradingData.map(candle => {
           candle.deltaAggregatePriceMean = round((candle.deltaPriceAbs - aggregateData.deltaPriceMean), 5);
           candle.deltaAggregatePriceMedian = round((candle.deltaPriceAbs - aggregateData.deltaPriceMedian), 5);
           candle.deltaAggregateRangeMean = round((candle.deltaRange - aggregateData.deltaRangeMean), 5);
           candle.deltaAggregateRangeMedian = round((candle.deltaRange - aggregateData.deltaRangeMedian), 5);
           candle.deltaAggregateVolumeMean = round((candle.volumefrom - aggregateData.volumeMean), 5);
           candle.deltaAggregateVolumeMedian = round((candle.volumefrom - aggregateData.volumeMedian), 5);

           candle.percentageDeltaPriceFromMedian = calcPercentage(candle.deltaAggregatePriceMedian, aggregateData.deltaPriceMedian);
           candle.percentageDeltaPriceFromMean = candle.deltaPriceAbs > aggregateData.deltaPriceMean ?
               calcPercentage(candle.deltaAggregatePriceMean, aggregateData.deltaPriceMeanToUpperBound) :
               calcPercentage(candle.deltaAggregatePriceMean, aggregateData.deltaPriceLowerBoundToMean);

           candle.percentageVolumeDeviationFromMedian = calcPercentage(candle.deltaAggregateVolumeMedian, aggregateData.deltaVolumeMedianToBounds);
           candle.percentageVolumeDeviationFromMean = candle.volumefrom > aggregateData.volumeMean ?
               calcPercentage(candle.deltaAggregateVolumeMean, aggregateData.deltaVolumeMeanToUpperBound) :
               calcPercentage(candle.deltaAggregateVolumeMean, aggregateData.deltaVolumeLowerBoundToMean);

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

                acc.deltaRangeMeanToUpperBound = round(acc.deltaRangeUpperBound - acc.deltaRangeMean, 5);
                acc.deltaRangeLowerBoundToMean = round(acc.deltaRangeMean - acc.deltaRangeLowerBound, 5);
                acc.deltaRangeMedianToBounds = round(acc.deltaRangeUpperBound - acc.deltaRangeMedian, 5);

                acc.deltaPriceMeanToUpperBound = round(acc.deltaPriceUpperBound - acc.deltaPriceMean, 5);
                acc.deltaPriceLowerBoundToMean = round(acc.deltaPriceMean - acc.deltaPriceLowerBound, 5);
                acc.deltaPriceMedianToBounds = round(acc.deltaPriceUpperBound - acc.deltaPriceMedian, 5);

                acc.deltaVolumeMeanToUpperBound = round(acc.volumeUpperBound - acc.volumeMean, 5);
                acc.deltaVolumeLowerBoundToMean = round(acc.volumeMean - acc.volumeLowerBound, 5);
                acc.deltaVolumeMedianToBounds = round(acc.volumeUpperBound - acc.volumeMedian, 5);
            }

            return acc;

        }, accumulator);
    }
}

export default VolumeDeviance
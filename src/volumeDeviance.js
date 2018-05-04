export class VolumeDeviance {
    constructor() {
    }

    augmentTradingData(candles) {
        const len = candles.length;
        let deltaPrice, deltaRange;

        return candles.map((candle, index, arr) => {
            deltaPrice = candle.open - candle.close;

            candle.deltaPrice = deltaPrice;
            candle.deltaPriceAbs = Math.abs(deltaPrice);
            candle.deltaRange = candle.high - candle.low;

            return candle;
        });
    }

    calcMedian(lo, hi) {
        return hi - ((hi - lo) / 2);
    }

    calcMean(amount, sum) {
        return sum / amount;
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
                acc.deltaPriceMean = this.calcMean(amount, sumDeltaPrice);
                acc.deltaPriceMedian = this.calcMedian(acc.deltaPriceLowerBound, acc.deltaPriceUpperBound);
                acc.deltaRangeMean = this.calcMean(amount, sumDeltaRange);
                acc.deltaRangeMedian = this.calcMedian(acc.deltaRangeLowerBound, acc.deltaRangeUpperBound);
                acc.volumeMean = this.calcMean(amount, sumVolume);
                acc.volumeMedian = this.calcMedian(acc.volumeLowerBound, acc.volumeUpperBound);
            }

            return acc;

        }, accumulator);
    }
}

export default VolumeDeviance
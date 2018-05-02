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

    calcPeriodData(candles) {
        const accumulator = {
            deltaPriceUpperBound: 0,
            deltaPriceLowerBound: 99999,
            deltaPriceMedian: 0,
            deltaRangeUpperBound: 0,
            deltaRangeLowerBound: 99999,
            deltaRangeMedian: 0,
            volumeUpperBound: 0,
            volumeLowerBound: 99999,
            volumeMean: 0
        };
        const finalIndex = candles.length - 1;

        candles.reduce((acc, current, index) => {
            if (current.deltaPriceAbs > acc.deltaPriceUpperBound) acc.deltaPriceUpperBound = current.deltaPriceAbs;
            if (current.deltaPriceAbs < acc.deltaPriceLowerBound) acc.deltaPriceLowerBound = current.deltaPriceAbs;
            if (current.deltaRange > acc.deltaRangeUpperBound) acc.deltaRangeUpperBound = current.deltaRange;
            if (current.deltaRange < acc.deltaRangeLowerBound) acc.deltaRangeLowerBound = current.deltaRange;
            if (current.volumefrom >  acc.volumeUpperBound) acc.volumeUpperBound = current.volumefrom;
            if (current.volumefrom <  acc.volumeLowerBound) acc.volumeLowerBound = current.volumefrom;



            if (index === finalIndex) {

            }

        }, accumulator);
    }
}

export default VolumeDeviance
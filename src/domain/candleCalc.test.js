import * as candleCalc from './candleCalc';

const mockCandle = {
    deltaPrice: 1
};

it('should return true if candle is green', () => {
    expect(candleCalc.isGreenCandle(mockCandle)).toEqual(true);
});
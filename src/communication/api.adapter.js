export default class ApiAdapter {
    constructor() {
        this.cryptocompareApi = 'https://min-api.cryptocompare.com/data/histohour';
    }

    fetchData(fetchOptions = {fromSymbol: 'BTC', toSymbol: 'USD', limit: 24}) {
        // todo: url builder

        return fetch(`${this.cryptocompareApi}?fsym=${fetchOptions.fromSymbol}&tsym=${fetchOptions.toSymbol}&limit=${fetchOptions.limit}`)
            .then((response) => {
                return response.json();
            })
    }
}
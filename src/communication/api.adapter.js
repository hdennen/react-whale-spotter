export default class ApiAdapter {
    constructor() {
        this.cryptocompareApi = 'https://min-api.cryptocompare.com/data/histohour';
    }

    fetchData(fetchOptions = {fromSymbol: 'BTC', toSymbol: 'USD', queryLimit: 24}) {
        // todo: url builder

        const endpoint = `${this.cryptocompareApi}?fsym=${fetchOptions.fromSymbol}&tsym=${fetchOptions.toSymbol}&limit=${fetchOptions.queryLimit}`;

        return fetch(endpoint)
            .then((response) => {
                return response.json();
            })
    }
}
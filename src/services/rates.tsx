import axios from 'axios';

const getRate = async (symbol: string, base: string) => {
    const baseurl = 'https://api.ratesapi.io/api/latest?base='
    const queryUrl = baseurl + base + '&symbols=' + symbol
    const response = await axios.get(queryUrl)
    const rate = response.data.rates[symbol]
    return rate;
};

export default {
  getRate, 
}
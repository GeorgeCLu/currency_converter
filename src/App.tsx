import React, {useState, useEffect } from 'react';
import ratesService from './services/rates';
import currencySelector from './components/currencySelector'
import currencyValue from './components/CurrencyValue';
import Container from '@material-ui/core/Container';
import'./App.css'

interface CurrencyConverterInterface {
  currency: (number);
  currencyToConvertFrom: (string);
  currencyToConvertTo: (string);
  convertedCurrency: (number);
  rate: (number);
  message: (string);
}

const App = () =>  {
const [currencyValues, setCurrencyValues] = useState<CurrencyConverterInterface>({
  currency: 1,
  currencyToConvertFrom: 'AUD',
  currencyToConvertTo: 'AUD',
  convertedCurrency: 1,
  rate: 1,
  message: "Please enter a value and the currencies to convert from and to",
});

useEffect(() => {
  if (currencyValues.currencyToConvertFrom === currencyValues.currencyToConvertTo){
    setCurrencyValues((currencyValues) => ({ ...currencyValues, convertedCurrency: 1 }))
  }
  else if (currencyValues.currency === 0){
    setCurrencyValues((currencyValues) => ({ ...currencyValues, convertedCurrency: 0 }))
  }
  else if (currencyValues.currencyToConvertFrom !== currencyValues.currencyToConvertTo && currencyValues.currency > 0) {
    ratesService.getRate(currencyValues.currencyToConvertFrom, currencyValues.currencyToConvertTo).then( 
      (rate) => {
      const converted =  parseFloat((currencyValues.currency/rate + Number.EPSILON).toFixed(2))
      setCurrencyValues((currencyValues) => ({ ...currencyValues, convertedCurrency: converted, rate: rate }))
      }
    )
  }
}, [currencyValues.currency, currencyValues.currencyToConvertFrom, currencyValues.currencyToConvertTo]);

useEffect(() => {
  if (isNaN(currencyValues.currency)){
    setCurrencyValues((currencyValues) => ({ ...currencyValues, message: "Please enter a value"}))
  }
  else if (currencyValues.currency <= 0){
    setCurrencyValues((currencyValues) => ({ ...currencyValues, message: "Please enter a positive value"}))
  }
  else if (currencyValues.currencyToConvertFrom === currencyValues.currencyToConvertTo ){
    setCurrencyValues((currencyValues) => ({ ...currencyValues, message: "Please choose the currencies to convert from and to"}))
  }
  else if (currencyValues.convertedCurrency === 0){
    setCurrencyValues((currencyValues) => ({ ...currencyValues, message: String(currencyValues.currency) + currencyValues.currencyToConvertFrom + ' is worth less than 0.01 ' + currencyValues.currencyToConvertTo + '\n Rate of: ' + String(currencyValues.rate) + '' + currencyValues.currencyToConvertFrom + ' to 1' + currencyValues.currencyToConvertTo + '\n Rates sourced from https://ratesapi.io/'}))
  }
  else{
    setCurrencyValues((currencyValues) => ({ ...currencyValues, message: String(currencyValues.currency) + currencyValues.currencyToConvertFrom + ' equals ' + String(currencyValues.convertedCurrency) + currencyValues.currencyToConvertTo + '\n Rate of: ' + String(currencyValues.rate) + '' + currencyValues.currencyToConvertFrom + ' to 1' + currencyValues.currencyToConvertTo + '\n Rates sourced from https://ratesapi.io/'}))
  } 
}, [currencyValues.currency, currencyValues.convertedCurrency, currencyValues.rate, currencyValues.currencyToConvertFrom, currencyValues.currencyToConvertTo]);

const handlecurrency = (value: number) => {
  setCurrencyValues((currencyValues) => ({ ...currencyValues, currency: value}))
}

const handleCurrencyToConvertFrom = (value: string) => {
  setCurrencyValues((currencyValues) => ({ ...currencyValues, currencyToConvertFrom: value}))
}

const handleCurrencyToConvertTo = (value: string) => {
  setCurrencyValues((currencyValues) => ({ ...currencyValues, currencyToConvertTo: value}))
}
  return (
    <Container maxWidth='xs'>
        <div>
          <h2>Simple Currency Converter</h2>
          Convert {"  "}
          {currencyValue(currencyValues.currency, handlecurrency)}
          {"  "}
          {currencySelector(handleCurrencyToConvertFrom)}
          {"  "} to {"  "}
          {currencySelector(handleCurrencyToConvertTo)}
          <br />
          {currencyValues.message.split("\n").map((i,key) => {
            return <div key={key}>{i}</div>;
        })}
          </div>  
    </Container>
  );
}

export default App; 
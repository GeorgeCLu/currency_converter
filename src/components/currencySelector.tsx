import React from 'react';
import { Select } from '@material-ui/core';
// import './currencySelector.css'

const currencySelector = (currencyHandler: (text: string) => void ) => {
  
    const handleCurrency = (value: string) => {
        currencyHandler(value);
      }

    // only currencies available through ratesapi.io
    const options = [
      { value: 'AUD', label: 'AUD' },
      { value: 'BGN', label: 'BGN' },
      { value: 'BRL', label: 'BRL' },
      { value: 'CAD', label: 'CAD' },
      { value: 'CHF', label: 'CHF' },
      { value: 'CNY', label: 'CNY' },
      { value: 'CZK', label: 'CZK' },
      { value: 'DKK', label: 'DKK' },
      { value: 'EUR', label: 'EUR' },
      { value: 'GBP', label: 'GBP' },
      { value: 'HKD', label: 'HKD' },
      { value: 'HRK', label: 'HRK' },
      { value: 'HUF', label: 'HUF' },
      { value: 'IDR', label: 'IDR' },
      { value: 'ILS', label: 'ILS' },
      { value: 'INR', label: 'INR' },
      { value: 'ISK', label: 'ISK' },
      { value: 'JPY', label: 'JPY' },
      { value: 'KRW', label: 'KRW' },
      { value: 'MXN', label: 'MXN' },
      { value: 'MYR', label: 'MYR' },
      { value: 'NOK', label: 'NOK' },
      { value: 'NZD', label: 'NZD' },
      { value: 'PHP', label: 'PHP' },
      { value: 'PLN', label: 'PLN' },
      { value: 'RON', label: 'RON' },
      { value: 'RUB', label: 'RUB' },
      { value: 'SEK', label: 'SEK' },
      { value: 'SGD', label: 'SGD' },
      { value: 'THB', label: 'THB' },
      { value: 'TRY', label: 'TRY' },
      { value: 'USD', label: 'USD' },
      { value: 'ZAR', label: 'ZAR' }        
    ];
  
    return (
      <Select id="currencyTo" native = {true} onChange={(e) => handleCurrency(String(e.target.value))}>
        {options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    );
  }
  
  export default currencySelector;
  
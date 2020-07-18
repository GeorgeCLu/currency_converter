import React, {ChangeEvent} from 'react';
import { Input } from '@material-ui/core';
// import './CurrencyValue.css'

const currencyValue = (currency: number, currencyHandler: (value: number) => void ) => {

    const handleCurrency = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        currencyHandler(event.target.valueAsNumber);
        }
    
    return (
      <Input
      className = "CurrencyInputValue"
      type="number"
      onChange={handleCurrency}
      value={currency}
      inputProps={{
        style: { textAlign: "right", width: 100}
      }}
      />
    );
  }
  
  export default currencyValue;
  
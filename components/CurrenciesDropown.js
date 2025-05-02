'use client'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import '@/app/globals.css'

// React icons
import { FaRupeeSign, FaDollarSign, FaPoundSign, FaEuroSign } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { BsCurrencyExchange } from 'react-icons/bs';
import { MdAttachMoney } from 'react-icons/md';
import { TbCurrencyTaka, TbCurrencyRiyal } from 'react-icons/tb';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const currencies = [
  {  name: 'Indian Rupee', Icon: FaRupeeSign },
  {  name: 'US Dollar', Icon: FaDollarSign },
  {  name: 'British Pound', Icon: FaPoundSign },
  {  name: 'Australian Dollar', Icon: GiTwoCoins },
  {  name: 'Emirates Dirham', Icon: RiMoneyDollarCircleLine },
  {  name: 'Euro', Icon: FaEuroSign },
  {  name: 'Canadian Dollar', Icon: MdAttachMoney },
  {  name: 'Bangladeshi Taka', Icon: TbCurrencyTaka },
  {  name: 'Philippine Peso', Icon: BsCurrencyExchange },
  {  name: 'Saudi Riyal', Icon: TbCurrencyRiyal },
];

const CurrenciesDropdown = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (currency) => {
    setSelected(currency);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light ">
      <div className="dropdown">
        <button
          className="btn custom-btn  button-layout"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selected ? (
            <span className="d-flex align-items-center gap-2">
              <selected.Icon size={20} />
              {selected.code}
              {selected.name}
            </span>
          ) : (
            'Select Currencies'
          )}
        </button>

        <ul className="dropdown-menu custom-dropdown shadow p-3">
          <div className="row g-3">
            {currencies.map((currency, idx) => (
              <div className="col-6" key={idx}>
                <button
                  className={`dropdown-item card-item d-flex align-items-center gap-3 p-3 rounded ${
                    selected?.code === currency.code ? 'active-item' : ''
                  }`}
                  onClick={() => handleSelect(currency)}
                >
                  <currency.Icon size={22} />
                  <div>
                    <div className="small text-muted">{currency.name}</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </ul>
      </div>

    </div>
  );
};

export default CurrenciesDropdown;

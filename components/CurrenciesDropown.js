'use client'
import { useState } from 'react'
// React icons
import { FaRupeeSign, FaDollarSign, FaPoundSign, FaEuroSign } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { BsCurrencyExchange } from 'react-icons/bs';
import { MdAttachMoney } from 'react-icons/md';
import { TbCurrencyTaka, TbCurrencyRiyal } from 'react-icons/tb';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const currencies = [
  { code: 'INR', name: 'Indian Rupee', Icon: FaRupeeSign },
  { code: 'USD', name: 'US Dollar', Icon: FaDollarSign },
  { code: 'GBP', name: 'British Pound', Icon: FaPoundSign },
  { code: 'AUD', name: 'Australian Dollar', Icon: GiTwoCoins },
  { code: 'AED', name: 'Emirates Dirham', Icon: RiMoneyDollarCircleLine },
  { code: 'EUR', name: 'Euro', Icon: FaEuroSign },
  { code: 'CAD', name: 'Canadian Dollar', Icon: MdAttachMoney },
  { code: 'BDT', name: 'Bangladeshi Taka', Icon: TbCurrencyTaka },
  { code: 'PHP', name: 'Philippine Peso', Icon: BsCurrencyExchange },
  { code: 'SAR', name: 'Saudi Riyal', Icon: TbCurrencyRiyal },
];

const CurrenciesDropdown = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (currency) => {
    setSelected(currency);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <div className="dropdown">
        <button
          className="btn custom-btn button-layout"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selected ? (
            <span className="d-flex align-items-center gap-2">
              <selected.Icon size={20} />
              <span>{selected.code} - {selected.name}</span>
            </span>
          ) : (
            'Select Currency'
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

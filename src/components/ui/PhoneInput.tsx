'use client';

import React from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  label?: string;
  error?: string;
}

export default function PhoneInput({ value, onChange, label, error }: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    onChange(digits);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="flex">
        <div
          className={`
            flex items-center justify-center px-4 py-2.5 rounded-l-xl border-2 border-r-0
            bg-gray-100 text-gray-600 font-semibold text-sm select-none
            ${error ? 'border-red-300' : 'border-gray-300'}
          `}
        >
          +880
        </div>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="1XXXXXXXXX"
          value={value}
          onChange={handleChange}
          maxLength={10}
          className={`
            flex-1 px-4 py-2.5 rounded-r-xl border-2 border-l-0 bg-white text-gray-900
            placeholder:text-gray-400 transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
          `}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

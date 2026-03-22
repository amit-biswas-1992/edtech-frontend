'use client';

import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  type?: 'text' | 'email' | 'password' | 'textarea';
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name?: string;
  required?: boolean;
  className?: string;
  id?: string;
}

export default function Input({
  label,
  placeholder,
  error,
  type = 'text',
  value,
  onChange,
  name,
  required,
  className = '',
  id,
}: InputProps) {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  const baseClasses = `
    w-full px-4 py-2.5 rounded-lg border bg-white text-gray-900
    placeholder:text-gray-400 transition-all duration-150
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          className={baseClasses}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={baseClasses}
        />
      )}
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

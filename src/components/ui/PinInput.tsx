'use client';

import React, { useRef, useCallback } from 'react';

interface PinInputProps {
  value: string;
  onChange: (pin: string) => void;
  label?: string;
  error?: string;
}

export default function PinInput({ value, onChange, label, error }: PinInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(5, '').slice(0, 5).split('');

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < 5) {
      inputsRef.current[index]?.focus();
    }
  }, []);

  const handleChange = useCallback(
    (index: number, inputValue: string) => {
      if (!/^\d*$/.test(inputValue)) return;

      const newDigits = value.padEnd(5, '').slice(0, 5).split('');
      newDigits[index] = inputValue.slice(-1);
      const newPin = newDigits.join('').replace(/ /g, '');
      onChange(newPin);

      if (inputValue && index < 4) {
        focusInput(index + 1);
      }
    },
    [value, onChange, focusInput]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        const newDigits = value.padEnd(5, '').slice(0, 5).split('');
        if (newDigits[index] && newDigits[index] !== ' ') {
          newDigits[index] = ' ';
          onChange(newDigits.join('').trimEnd());
        } else if (index > 0) {
          newDigits[index - 1] = ' ';
          onChange(newDigits.join('').trimEnd());
          focusInput(index - 1);
        }
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        focusInput(index - 1);
      } else if (e.key === 'ArrowRight') {
        focusInput(index + 1);
      }
    },
    [value, onChange, focusInput]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
      if (pasted) {
        onChange(pasted);
        focusInput(Math.min(pasted.length, 4));
      }
    },
    [onChange, focusInput]
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex gap-3 justify-center">
        {[0, 1, 2, 3, 4].map((index) => {
          const hasValue = digits[index] && digits[index].trim() !== '';
          return (
            <input
              key={index}
              ref={(el) => { inputsRef.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digits[index]?.trim() || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              className={`
                w-14 h-14 text-center text-2xl font-bold rounded-xl border-2
                transition-all duration-200 outline-none
                ${hasValue
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-gray-300 bg-white'
                }
                focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:scale-105
                ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}
              `}
            />
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}

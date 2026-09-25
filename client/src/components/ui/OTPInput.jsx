import React, { useRef } from 'react';
import './OTPInput.css';

export const OTPInput = ({ length = 6, value, onChange }) => {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/[^0-9]/.test(val)) return;
    
    const newVal = value.split('');
    newVal[index] = val;
    onChange(newVal.join(''));

    if (val && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, length).replace(/[^0-9]/g, '');
    onChange(pasted.padEnd(length, ' ').slice(0, length));
  };

  return (
    <div className="otp-container" onPaste={handlePaste}>
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={el => inputs.current[idx] = el}
          type="text"
          maxLength={1}
          className="otp-box"
          value={value[idx] || ''}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  );
};

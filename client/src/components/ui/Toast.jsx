import React from 'react';
import { Toaster } from 'react-hot-toast';

export const Toast = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: 'var(--surface2)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '14px',
        },
        success: {
          iconTheme: {
            primary: 'var(--success)',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--danger)',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

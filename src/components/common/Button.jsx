import React from 'react';

export default function Button({ children, type = 'button', onClick, className = '', disabled = false, variant = 'primary' }) {
    // Dynamically apply styles based on the 'btn' classes in the CSS
    const baseClass = 'btn';
    const variantClass = variant === 'secondary' ? 'btn-secondary' : '';
    const finalClass = `${baseClass} ${variantClass} ${className}`.trim();

    return (
        <button type={type} onClick={onClick} className={finalClass} disabled={disabled}>
            {children}
        </button>
    );
}

import React from 'react';

export default function Input({ label, type = 'text', name, value, onChange, placeholder, required = false, className = '', style = {} }) {
    // If used inside a filters bar (no label), render just the input to avoid extra form-group margin
    if (!label) {
        return (
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`input-field ${className}`}
                style={style}
            />
        );
    }

    return (
        <div className="form-group">
            <label>{label} {required && <span style={{ color: 'var(--error)' }}>*</span>}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`input-field ${className}`}
                style={style}
            />
        </div>
    );
}

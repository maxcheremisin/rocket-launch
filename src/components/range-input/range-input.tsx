import React from 'react';
import s from './style.module.css';

interface RangeInput {
    value: number;
    label: string;
    onChange(v: number): void;
}

export const RangeInput: React.FC<RangeInput> = ({value, label, onChange}) => {
    return (
        <label className={s.container}>
            <div className={s.label}>
                <span className={s.labelText}>{label}</span>
                <span className={s.labelValue}>v: {value}</span>
            </div>
            <input className={s.input} type='range' min={1} max={20} value={value} onChange={e => onChange(Number(e.target.value))} />
        </label>
    );
};

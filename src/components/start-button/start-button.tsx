import React from 'react';
import s from './style.module.css';

interface StartButtonProps {
    label: string;
    onClick(): void;
}

export const StartButton: React.FC<StartButtonProps> = ({label, onClick}) => {
    return (
        <button className={s.button} type='button' onClick={onClick}>{label}</button>
    );
};

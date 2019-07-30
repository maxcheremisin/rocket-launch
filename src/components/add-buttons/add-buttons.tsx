import React from 'react';
import {ReactComponent as AddSvg} from '../../icons/button-add.svg';
import {ReactComponent as RemoveSvg} from '../../icons/button-remove.svg';
import s from './style.module.css';

interface AddButtonsProps {
    label: string;
    onAdd(): void;
    onRemove(): void;
}

export const AddButtons: React.FC<AddButtonsProps> = ({label, onAdd, onRemove}) => {
    return (
        <div className={s.container}>
            <h1>{label}</h1>
            <RemoveSvg onClick={onRemove} />
            <AddSvg onClick={onAdd} />
        </div>
    );
};

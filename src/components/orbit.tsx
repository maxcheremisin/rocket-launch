import React from 'react';
import {Coordinates, OrbitData} from '../types';
import {satelliteFlightRadius, moonFlightRadius} from '../consts';

interface OrbitProps extends OrbitData {
    type: 'satellite' | 'moon';
    center: Coordinates;
}

export const Orbit: React.FC<OrbitProps> = ({type, center, offsetX = 0, offsetY = 0}) => {
    const radius = type === 'moon' ? moonFlightRadius : satelliteFlightRadius;
    const diameter = radius * 2;

    const style: React.CSSProperties = {
        position: 'fixed',
        height: diameter,
        width: diameter,
        left: center.x - radius + offsetX,
        top: center.y - radius + offsetY,
        border: '1px dashed #92929233',
        borderRadius: '50%',
        zIndex: -1,
    };

    return <div style={style} />;
};

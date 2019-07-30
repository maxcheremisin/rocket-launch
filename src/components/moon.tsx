import React from 'react';
import {ReactComponent as MoonSvg} from '../icons/moon.svg';
import {moonDiameter, moonFlightRadius} from '../consts';
import {Coordinates} from '../types';
import {getMovingObjectStyles} from '../helpers';
import {Orbit} from './orbit';

interface MoonProps {
    angle: number;
    center: Coordinates;
}

export const Moon = React.forwardRef<HTMLDivElement, MoonProps>(({center, angle}, ref) => {
    const style = getMovingObjectStyles(center.x - moonDiameter / 2, center.y - moonDiameter / 2, angle, moonFlightRadius);

    return (
        <div style={style} ref={ref}>
            <Orbit type='moon' center={center} />
            <MoonSvg style={{zIndex: 1}} />
        </div>
    );
});

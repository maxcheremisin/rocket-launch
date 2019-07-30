import React from 'react';
import {ReactComponent as SatelliteSvg} from '../icons/satellite.svg';
import {satelliteHeight, satelliteWidth, satelliteFlightRadius, satelliteRotationCoefficient} from '../consts';
import {Coordinates, SatelliteModel} from '../types';
import {getMovingObjectStyles} from '../helpers';
import {Orbit} from './orbit';

interface SatelliteProps extends SatelliteModel {
    center: Coordinates;
}

export const Satellite = React.forwardRef<HTMLDivElement, SatelliteProps>(({direction, center, offsetX, offsetY, angle}, ref) => {
    const style = getMovingObjectStyles(
        center.x - satelliteWidth / 2 + offsetX,
        center.y - satelliteHeight / 2 + offsetY,
        angle,
        satelliteFlightRadius,
    );

    const rotation = (direction === 'asc' ? 0 : 180) + angle * satelliteRotationCoefficient;

    return (
        <div style={style} ref={ref}>
            <Orbit type='satellite' center={center} offsetX={offsetX} offsetY={offsetY} />
            <SatelliteSvg style={{transform: `rotate(${rotation}deg)`, willChange: 'transform'}} />
        </div>
    );
});

import {CSSProperties} from 'react';

function getRandomFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomAngle = () => getRandomFromRange(0, 360);
export const getRandomOffset = () => getRandomFromRange(-100, 100);
export const getRandomDirection = () => getRandomFromRange(0, 1) ? 'asc' : 'desc';

export const getMovingObjectStyles = (x: number, y: number, angle: number, flightRadius: number): CSSProperties => {
    return {
        position: 'fixed',
        left: x + flightRadius * Math.sin((2 * Math.PI) / 180 + angle / 100),
        top: y + flightRadius * Math.cos((2 * Math.PI) / 180 + angle / 100)
    };
};

export function isIntersected(rectA: ClientRect, rectB: ClientRect) {
    return !(
        rectB.left >= rectA.right ||
        rectB.right <= rectA.left ||
        rectB.top >= rectA.bottom ||
        rectB.bottom <= rectA.top
    );
}

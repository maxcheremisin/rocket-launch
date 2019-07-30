import React, {useLayoutEffect, useRef} from 'react';
import {ReactComponent as ShipSvg} from '../icons/ship.svg';
import {isIntersected} from '../helpers';

interface ShipProps {
    positionY: number;
    stopGame(): void;
    elements: Array<HTMLDivElement | null>;
}

export const Ship: React.FC<ShipProps> = ({positionY, stopGame, elements}) => {
    const shipRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (shipRef.current) {
            const shipRect = shipRef.current.getBoundingClientRect();

            if (shipRect.top <= 0) {
                stopGame();
                alert('The rocket successfully launched into space');
            }

            elements.forEach(el => {
                if (el && isIntersected(el.getBoundingClientRect(), shipRect)) {
                    stopGame();
                    alert('Collision occurred');
                }
            });
        }
    }, [elements, positionY, stopGame]);

    const style: React.CSSProperties = {position: 'absolute', zIndex: 1, top: -positionY};

    return (
        <div style={style} ref={shipRef}>
            <ShipSvg />
        </div>
    );
};

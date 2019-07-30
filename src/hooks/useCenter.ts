import {useCallback, useLayoutEffect, useState} from 'react';
import {Coordinates} from '../types';

export const useCenter = (canvas: HTMLDivElement | null) => {
    const [center, setCenter] = useState<Coordinates>({x: 500, y: 500});

    const updateCenter = useCallback(() => {
        if (canvas) {
            const x = canvas.offsetLeft + canvas.offsetWidth / 2;
            const y = canvas.offsetTop + canvas.offsetHeight / 2 + canvas.offsetHeight * 0.1;

            setCenter({x, y});
        } else {
            setCenter({x: 500, y: 500});
        }
    }, [canvas]);

    useLayoutEffect(() => {
        window.addEventListener('resize', updateCenter);

        updateCenter();

        return () => {
            window.removeEventListener('resize', updateCenter);
        };
    }, [updateCenter]);

    return center;
};

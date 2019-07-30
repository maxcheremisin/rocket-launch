import {useReducer, useRef, useState, useMemo} from 'react';
import {earthRadius, speedCoefficient} from '../consts';
import {getRandomAngle, getRandomOffset, getRandomDirection} from '../helpers';
import * as types from '../types';
import * as actions from '../actions';

let currentSatelliteId = 0;

const createSatellite = (): types.SatelliteModel => ({
    id: ++currentSatelliteId,
    offsetX: getRandomOffset(),
    offsetY: getRandomOffset(),
    angle: getRandomAngle(),
    direction: getRandomDirection(),
    speed: 3,
});

const getInitialState = (): types.GameState => ({
    moon: {angle: getRandomAngle(), speed: 1},
    ship: {positionY: earthRadius, speed: 2},
    satellites: [createSatellite(), createSatellite()],
});

const reducer = (state: types.GameState, action: types.GameAction): types.GameState => {
    const {ship, moon, satellites} = state;

    switch (action.type) {
        case types.GameActionType.Start: {
            return {
                ship: {...ship, positionY: ship.positionY + ship.speed * speedCoefficient},
                moon: {...moon, angle: moon.angle + moon.speed * speedCoefficient},
                satellites: satellites.map(s => ({
                    ...s,
                    angle: s.angle + s.speed * speedCoefficient * (s.direction === 'asc' ? 1 : -1),
                })),
            };
        }
        case types.GameActionType.ChangeMoonSpeed: {
            const moonSpeed = action.payload;
            const shipSpeed = moonSpeed >= ship.speed ? (moonSpeed >= 19 ? 20 : moonSpeed + 1) : ship.speed;

            return {
                moon: {...moon, speed: moonSpeed},
                ship: {...ship, speed: shipSpeed},
                satellites: satellites.map(s => {
                    const satelliteSpeed = shipSpeed >= s.speed ? (shipSpeed >= 19 ? 20 : shipSpeed + 1) : s.speed;

                    return {...s, speed: satelliteSpeed};
                }),
            };
        }
        case types.GameActionType.ChangeSatelliteSpeed: {
            const satelliteSpeed = action.payload.speed;
            const shipSpeed = satelliteSpeed <= ship.speed ? (satelliteSpeed <= 2 ? 1 : satelliteSpeed - 1) : ship.speed;
            const moonSpeed = shipSpeed <= moon.speed ? (shipSpeed <= 2 ? 1 : shipSpeed - 1) : moon.speed;

            return {
                ship: {...ship, speed: shipSpeed},
                moon: {...moon, speed: moonSpeed},
                satellites: satellites.map(s => {
                    if (s.id === action.payload.id) {
                        return {...s, speed: action.payload.speed};
                    }
                    return s;
                }),
            };
        }
        case types.GameActionType.AddSatellite: {
            return {
                ...state,
                satellites: satellites.length >= 4 ? satellites : [...satellites, createSatellite()],
            };
        }
        case types.GameActionType.RemoveSatellite: {
            return {
                ...state,
                satellites: satellites.length <= 2 ? satellites : satellites.slice(0, satellites.length - 1),
            };
        }
        case types.GameActionType.Stop: {
            return getInitialState();
        }
    }

    return state;
};

export const useGame = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [state, dispatch] = useReducer(reducer, getInitialState());

    const intervalId = useRef<number>();

    const controls = useMemo(
        () => ({
            start: () => {
                intervalId.current = window.setInterval(() => {
                    dispatch(actions.startGame());
                }, 50);
                setIsStarted(true);
                setIsRunning(true);
            },
            stop: () => {
                dispatch(actions.stopGame());
                clearInterval(intervalId.current);
                setIsStarted(false);
                setIsRunning(false);
            },
            pause: () => {
                clearInterval(intervalId.current);
                setIsStarted(true);
                setIsRunning(false);
            },
            changeMoonSpeed: (speed: number) => dispatch(actions.changeMoonSpeed(speed)),
            changeSatelliteSpeed: (speed: number, id: number) => dispatch(actions.changeSatelliteSpeed(speed, id)),
            addSatellite: () => dispatch(actions.addSatellite()),
            removeSatellite: () => dispatch(actions.removeSatellite()),
        }),
        [],
    );

    return {
        gameState: state,
        gameControl: {isStarted, isRunning, ...controls},
    };
};

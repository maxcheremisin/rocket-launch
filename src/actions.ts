import {GameActionType} from './types';

export function startGame() {
    return {type: GameActionType.Start} as const;
}

export function stopGame() {
    return {type: GameActionType.Stop} as const;
}

export function changeMoonSpeed(speed: number) {
    return {type: GameActionType.ChangeMoonSpeed, payload: speed} as const;
}

export function changeSatelliteSpeed(speed: number, id: number) {
    return {type: GameActionType.ChangeSatelliteSpeed, payload: {speed, id}} as const;
}

export function addSatellite() {
    return {type: GameActionType.AddSatellite} as const;
}

export function removeSatellite() {
    return {type: GameActionType.RemoveSatellite} as const;
}

import * as actions from './actions';

export type Coordinates = Record<'x' | 'y', number>;

export interface GameState {
    ship: ShipModel;
    moon: MoonModel;
    satellites: SatelliteModel[];
}

export enum GameActionType {
    Start,
    Stop,
    AddSatellite,
    RemoveSatellite,
    ChangeSatelliteSpeed,
    ChangeMoonSpeed,
}

export type GameAction =
    | ReturnType<typeof actions.startGame>
    | ReturnType<typeof actions.stopGame>
    | ReturnType<typeof actions.changeMoonSpeed>
    | ReturnType<typeof actions.changeSatelliteSpeed>
    | ReturnType<typeof actions.addSatellite>
    | ReturnType<typeof actions.removeSatellite>;

export interface OrbitData {
    offsetX?: number;
    offsetY?: number;
}

interface HasSpeed {
    speed: number;
}

interface HasAngle {
    angle: number;
}

export interface MoonModel extends HasAngle, HasSpeed {}

export interface ShipModel extends HasSpeed {
    positionY: number;
}

export interface SatelliteModel extends HasSpeed, HasAngle, Required<OrbitData> {
    id: number;
    direction: 'asc' | 'desc';
}

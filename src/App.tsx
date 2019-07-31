import React, {useRef} from 'react';
import {useCenter} from './hooks/useCenter';
import {useGame} from './hooks/useGame';
import {Earth, Ship, Satellite, Moon, RangeInput, StartButton, AddButtons, Corner} from './components';
import s from './App.module.css';

export const App = () => {
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const center = useCenter(canvasRef.current);
    const {
        gameState: {ship, satellites, moon},
        gameControl: {isStarted, isRunning, pause, start, stop, changeMoonSpeed, changeSatelliteSpeed, addSatellite, removeSatellite}
    } = useGame();
    const elements = useRef(new Set<HTMLDivElement | null>());

    const style: React.CSSProperties = {top: center.y, left: center.x};

    return (
        <div className={s.canvas} ref={canvasRef}>
            <Corner />
            <div className={s.center} style={style}>
                <Earth />
                <Moon ref={el => elements.current.add(el)} angle={moon.angle} center={center} />
                <Ship positionY={ship.positionY} stopGame={stop} elements={Array.from(elements.current)} />
                {satellites.map(props => (
                    <Satellite ref={el => elements.current.add(el)} key={props.id} center={center} {...props} />
                ))}
            </div>
            <div className={s.actions}>
                <div>
                    <AddButtons label='Satellites' onAdd={addSatellite} onRemove={removeSatellite} />
                    {satellites.map((props, i) => (
                        <RangeInput key={props.id} label={`Satellite ${i}`} value={props.speed} onChange={v => changeSatelliteSpeed(v, props.id)} />
                    ))}
                </div>
                <RangeInput label='Moon' value={moon.speed} onChange={changeMoonSpeed} />
            </div>
            <div className={s.buttons}>
                {isStarted && <StartButton onClick={stop} label='Stop' />}
                {isRunning && isStarted && <StartButton onClick={pause} label='Pause' />}
                {!isRunning && <StartButton onClick={start} label='Start' />}
            </div>
        </div>
    );
};

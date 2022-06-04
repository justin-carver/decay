import React, { useEffect, useRef } from 'react';
import { CanvasConfig } from './components/DecayCanvas';
import GameMaster from './components/GameMaster';
import IMap from './services/map';
import ITile from './services/tile';
import { generateMap, updateNoiseMap, noiseType } from './services/mapGen';

const Decay = (canvasConfig: CanvasConfig, props: any) => {
    const DecayContext = React.createContext({});

    let ctx = useRef<CanvasRenderingContext2D>();
    let map = useRef<IMap>();

    const initializeDecay = (canvasConfig: CanvasConfig): void => {
        map.current = generateMap(
            canvasConfig.terminalHeight,
            canvasConfig.terminalWidth,
            (document.querySelector('.sliderX') as HTMLInputElement).valueAsNumber, // * DEV STUFF
            (document.querySelector('.sliderY') as HTMLInputElement).valueAsNumber, // * DEV STUFF
            undefined,
            canvasConfig.tileWidth,
            canvasConfig.tileHeight,
            'defaultMapSeed'
        );
    };

    useEffect(() => {
        initializeDecay(canvasConfig);
    }, []);

    // Tile Iterations
    useEffect(() => {
        // TODO: Fix why this is breaking everything. Child not rendering in time?
        if (document.querySelector('.DecayCanvas') !== null) {
            let ctx = (document.querySelector('.DecayCanvas') as HTMLCanvasElement).getContext(
                '2d'
            ) as CanvasRenderingContext2D;
            map.current?.tiles?.forEach((tileArr: ITile[]) => {
                tileArr.forEach((tile) => {
                    if (tile.render !== undefined) tile.render(ctx, tile.coords, tile.noise);
                });
            });
        }
    }, []);
    return (
        <DecayContext.Provider value={map}>
            <input
                type="range"
                min="0"
                max="100"
                defaultValue="0"
                className="sliderX"
                onChange={() => {
                    // TODO: NOT BEING ASSIGNED TO ANYTHING!
                    updateNoiseMap(
                        noiseType.Simplex2D,
                        canvasConfig.terminalWidth,
                        canvasConfig.terminalHeight,
                        5,
                        (document.querySelector('.sliderX') as HTMLInputElement).valueAsNumber,
                        (document.querySelector('.sliderY') as HTMLInputElement).valueAsNumber
                    );
                }}
            />
            <input type="range" min="0" max="100" defaultValue="0" className="sliderY" />
            <GameMaster>{props.children}</GameMaster>
            {props.children}
        </DecayContext.Provider>
    );
};

export default Decay;

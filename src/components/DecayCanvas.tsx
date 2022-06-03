import { useEffect, useRef } from 'react';
import './DecayCanvas.css';
import { generateMap, IMap } from '../services/mapGen';

export interface CanvasConfig {
    terminalWidth: number;
    terminalHeight: number;
    tileWidth: number;
    tileHeight: number;
}

const DecayCanvas = (config: CanvasConfig) => {
    useEffect(() => {
        const canvas = document.querySelector('.DecayCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        let map = generateMap(
            config.terminalWidth,
            config.terminalHeight,
            config.tileWidth,
            config.tileHeight
        );

        // Iterate through every tile, call it's render function.
        map.tiles.forEach((tileArr) => {
            tileArr.forEach((tile) => {
                if (tile.render !== undefined) tile.render(ctx, tile.coords, tile.noise);
            });
        });
        console.log(map);
    }, []);
    return <canvas className="DecayCanvas" width={800} height={600}></canvas>;
};

export default DecayCanvas;

import './DecayCanvas.css';
import ITile from '../services/tile';
import { ReactElement, useEffect } from 'react';
import { useStore } from './Engine';

export interface CanvasConfig {
    terminalWidth: number;
    terminalHeight: number;
    tileWidth: number;
    tileHeight: number;
}

const DecayCanvas = (props: any) => {
    let gm = useStore((state: any) => state.gameMaster);
    // Render Loop
    useEffect(() => {
        // TODO: Should include prop boolean for conditional rendering ticks.
        if (document.querySelector('.DecayCanvas') !== null) {
            let ctx = (document.querySelector('.DecayCanvas') as HTMLCanvasElement).getContext(
                '2d'
            ) as CanvasRenderingContext2D;
            gm.world.tiles?.forEach((tileArr: ITile[]) => {
                tileArr.forEach((tile) => {
                    if (tile.render !== undefined) {
                        tile.render(ctx, tile.coords, tile.noise);
                    }
                });
            });
        }
    });
    // ? Canvas width and height must be { width/height % tileWidth/height === 0 } for tiles to be proportional.
    return <canvas className="DecayCanvas" width={800} height={640}></canvas>;
};

export default DecayCanvas;

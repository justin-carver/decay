import { useEffect } from 'react';
import './DecayCanvas.css';
import ITile from '../services/tile';
import IPlayer from '../components/player';

const DecayCanvas = (props: any) => {
    // Render Loop
    useEffect(() => {
        // TODO: Should include prop boolean for conditional rendering ticks.
        if (document.querySelector('.DecayCanvas') !== null) {
            let ctx = (document.querySelector('.DecayCanvas') as HTMLCanvasElement).getContext(
                '2d'
            ) as CanvasRenderingContext2D;
            props.gameMaster.world.tiles?.forEach((tileArr: ITile[]) => {
                tileArr.forEach((tile) => {
                    props.player.tile.render(ctx);
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

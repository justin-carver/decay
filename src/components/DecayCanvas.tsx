import { useCallback, useEffect } from 'react';
import './DecayCanvas.css';
import ITile from '../services/tile';

/**
 *  Canvas layers, environment on one layer, entities on another.
 */

const DecayCanvas = (props: any) => {
    // Should these be custom useCallback functions?
    // Render Loop
    useEffect(() => {
        // TODO: Should include prop boolean for conditional rendering ticks.
        if (document.querySelector('.dc_environment') !== null) {
            let ctx = (document.querySelector('.dc_environment') as HTMLCanvasElement).getContext(
                '2d'
            ) as CanvasRenderingContext2D;
            props.gameMaster.world.tiles?.forEach((tileArr: ITile[]) => {
                tileArr.forEach((tile) => {
                    if (tile.render !== undefined) {
                        tile.render(ctx, tile.coords, tile.noise);
                    }
                });
            });
        }
    }, [props.gameMaster.world]);

    // Entity render loop.
    useEffect(() => {
        // Array of entities should exist, iterate over render function of all entities.
        // similar to tileArr render up top.
        let ctx = (document.querySelector('.dc_entities') as HTMLCanvasElement).getContext(
            '2d'
        ) as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, 800, 640); // Must clear canvas before rendering.
        props.player.tile.render(ctx);
    }, [props.player]);

    // ? Canvas width and height must be { canvasWidth/Height % tileWidth/height === 0 } for tiles to be proportional.
    // ? Canvas sandwitch with various layers. Z-index should be managed through CSS.
    return (
        <>
            <canvas
                className="dc_environment"
                width={800}
                height={640}
                style={{ position: 'absolute' }}
            />
            <canvas
                className="dc_entities"
                width={800}
                height={640}
                style={{ position: 'absolute' }}
            />
        </>
    );
};

export default DecayCanvas;

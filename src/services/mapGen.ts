import SimplexNoise from 'simplex-noise';
import Tile from '../components/Tile';

// const DEFAULT_HISTORY_LENGTH: number = 600;

export interface IMap {
    mapWidth: number;
    mapHeight: number;
    cellWidth?: number;
    cellHeight?: number;
    tiles: Tile[][];
    name?: string;
    historyLength?: number;
}

/**
 * Generates a tile-based map given the parameters.
 * @param width - Width of generated map.
 * @param height - Height of generated map.
 * @param cWidth - Cell Width (Only matters if canvas is rendering)
 * @param cHeight - Cell Height (Only matters if canvas is rendering)
 */
export const generateMap = (
    width: number,
    height: number,
    cWidth?: number,
    cHeight?: number,
    tiles?: Tile[][], // Not setup for Simplex3D
    name?: string
): IMap => {
    const map: IMap = {
        mapWidth: width,
        mapHeight: height,
        cellWidth: cWidth,
        cellHeight: cHeight,
        tiles: initMapTiles(width, height, cWidth, cHeight, 10, 'roguelikes'),
        name: '',
        historyLength: 0,
    };
    return map;
};

/**
 * Initializing and sets up inital map tiles. Even if no rendering will occur, map tiles must be calculated.
 * @param width - Width of terminal.
 * @param height - Height of terminal.
 * @param cWidth - Cell Width (Optional): Defaults to 0 if no tile rendering will take place.
 * @param cHeight - Cell Height (Optional): Defaults to 0 if no tile rendering will take place.
 * @param seed - Seed used for noise generation.
 * @returns {Tile[][]}
 */
export const initMapTiles = (
    width: number,
    height: number,
    cWidth: number = 0,
    cHeight: number = 0,
    resolution: number = 4,
    seed: string = 'seed'
): Tile[][] => {
    let tiles: Tile[][] = [];
    const simplexMap = generate2DSimplexNoise(width, height, resolution, seed); // * This should be a choice later.
    let yOffset: number = 0;
    // 2D Tile Init Mapping
    for (let i = 0; i < width; i++) {
        let xOffset: number = 0;
        tiles[i] = [];
        for (let j = 0; j < height; j++) {
            tiles[i].push({
                type: '',
                cell: [i, j],
                coords: [xOffset, yOffset],
                noise: simplexMap[i][j],
                // Render pass
                render: (ctx: CanvasRenderingContext2D, coords: number[], noise: number) => {
                    ctx.fillStyle = calculateTileColor(noise);
                    ctx.fillRect(coords[0], coords[1], cWidth, cHeight);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    ctx.fillStyle = '#000';
                    ctx.font = 'bold 32px monospace'; // TODO: Add to config.
                    ctx.fillText('e', coords[0] + cWidth / 2, coords[1] + cHeight / 2);
                },
            });
            xOffset += cWidth;
        }
        yOffset += cHeight;
    }
    console.log(tiles);
    return tiles;
};

/**
 *
 * @param noise - The amount of noise generated on the current tile.
 * @param lightLevel - The level of light illuminating from this tile.
 * @returns {string} - Hexidecimal color.
 */
export const calculateTileColor = (noise: number, lightLevel?: number): string => {
    let [r, g, b, a] = [0, 0, 0, 1];
    if (noise < 0.2) return `rgba(${r + 20}, ${g + 20}, ${b + 20}, ${a})`;
    if (noise < 0.4) return `rgba(${r + 60}, ${g + 60}, ${b + 60}, ${a})`;
    if (noise < 0.6) return `rgba(${r + 120}, ${g + 120}, ${b + 120}, ${a})`;
    if (noise < 0.7) return `rgba(${r + 180}, ${g + 180}, ${b + 180}, ${a})`;
    if (noise < 0.9) return `rgba(${r + 220}, ${g + 220}, ${b + 220}, ${a})`;
    return '#222';
};

export const generate2DSimplexNoise = (
    width: number,
    height: number,
    resolution: number = 4,
    seed?: string
): number[][] => {
    const map: number[][] = [];
    const simplex = new SimplexNoise(seed);
    for (let i = 0; i < width; i++) {
        map[i] = [];
        for (let j = 0; j < height; j++) {
            map[i].push(simplex.noise2D(i / resolution, j / resolution) / 2 + 0.5);
        }
    }
    return map;
};

// ? May need at some point? Unsure if noise is accuarate...
export const generate3DSimplexNoise = (
    width: number,
    depth: number,
    height: number,
    seed?: string
): number[][][] => {
    const map: number[][][] = [];
    const simplex = new SimplexNoise(seed);
    for (let i = 0; i < width; i++) {
        map[i] = [];
        for (let j = 0; j < height; j++) {
            map[i][j] = [];
            for (let w = 0; w < depth; w++) {
                map[i][j].push(simplex.noise3D(i, j, w) / 2 + 0.5);
            }
        }
    }
    return map;
};

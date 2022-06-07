import SimplexNoise from 'simplex-noise';
import ITile from './tile';
import IWorld from './world';
import { ChangeEventHandler } from 'react';

export enum noiseType {
    Simplex2D,
    Perlin2D,
    Vernoi,
}

export const tileRender = (callback: void) => callback; // ? Is this needed?

/** // TODO: Update params
 * Generates a tile-based World given the parameters.
 * @param width - Width of generated World.
 * @param height - Height of generated World.
 * @param offsetX - The X axis offset for use within noise function rendering.
 * @param offsetY - The Y axis offset for use within noise function rendering.
 * @param tiles - (Optional) Allows importing of custom Tile[][] object.
 * @param cWidth - Cell Width (Only matters if canvas is rendering)
 * @param cHeight - Cell Height (Only matters if canvas is rendering)
 */
export const generateWorld = (
    width: number,
    height: number,
    offsetX: number = 0,
    offsetY: number = 0,
    tiles?: ITile[][],
    cWidth?: number,
    cHeight?: number,
    seed?: string,
    name?: string
): IWorld => {
    const World: IWorld = {
        mapWidth: width, // TODO: Should these be called mapWidth or worldWidth? Can the world have a width?
        mapHeight: height,
        cellWidth: cWidth,
        cellHeight: cHeight,
        offsetX: offsetX,
        offsetY: offsetY,
        tiles: (() => {
            if (tiles === undefined) {
                return initWorldTiles(width, height, cWidth, cHeight, 6, offsetX, offsetY, seed, 2);
            }
        })() as ITile[][],
        name: '',
        historyLength: 0,
    };
    return World;
};

/** // TODO: Add params
 * Initializing and sets up inital World tiles. Even if no rendering will occur, World tiles must be calculated.
 * @param width - Width of terminal.
 * @param height - Height of terminal.
 * @param cWidth - Cell Width (Optional): Defaults to 0 if no tile rendering will take place.
 * @param cHeight - Cell Height (Optional): Defaults to 0 if no tile rendering will take place.
 * @param seed - Seed used for noise generation.
 * @returns {ITile[][]}
 */
export const initWorldTiles = (
    width: number,
    height: number,
    cWidth: number = 0,
    cHeight: number = 0,
    resolution: number = 4,
    offsetX: number,
    offsetY: number,
    seed: string = 'seed',
    iterations: number
): ITile[][] => {
    let tiles: ITile[][] = [];
    const simplexMap = generate2DSimplexNoise(
        width,
        height,
        resolution,
        offsetX,
        offsetY,
        seed,
        iterations
    ); // * This should be a choice later.
    // 2D Tile Init Mapping
    for (let i = 0; i < width; i++) {
        tiles[i] = [];
        offsetX = 0;
        for (let j = 0; j < height; j++) {
            tiles[i].push({
                type: '',
                cell: [i, j],
                coords: [offsetX, offsetY],
                noise: simplexMap[i][j],
                tileWidth: cWidth,
                tileHeight: cHeight,
                // Render Template
                // TODO: Decouple render to allow custom user injection. Use 'tileRender' callback function.
                render: (ctx: CanvasRenderingContext2D, coords: number[], noise: number) => {
                    // Tile Background Color
                    ctx.fillStyle = calculateTileColor(noise);
                    ctx.fillRect(coords[0], coords[1], cWidth, cHeight);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    // Tile Outlines
                    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                    ctx.strokeRect(coords[0], coords[1], cWidth, cHeight);

                    // Tile Character
                    ctx.fillStyle = '#000';
                    ctx.font = 'bold 18px monospace'; // TODO: Add to config.
                    ctx.fillText('w', coords[0] + cWidth / 2, coords[1] + cHeight / 2);
                },
            });
            offsetX += cWidth;
        }
        offsetY += cHeight;
    }
    return tiles;
};

/**
 * Reference the original noise map function for more detailed paramaters.
 * @param noise - Enum of noiseType regarding which noise function to produce.
 * @param w - Width of noise map.
 * @param h - Height of noise map.
 * @param r - Resolution of noise map.
 * @param oX - Offset on the X axis.
 * @param oY - Offset on the Y axis.
 */
export const updateNoiseMap = (
    noise: noiseType,
    w: number,
    h: number,
    r: number,
    oX: number,
    oY: number
): ChangeEventHandler<HTMLInputElement> | any => {
    if (noise === noiseType.Simplex2D) return generate2DSimplexNoise(w, h, r, oX, oY);
};

/**
 *
 * @param noise - The amount of noise generated on the current tile.
 * @param lightLevel - The level of light illuminating from this tile.
 * @returns {string} - Hexidecimal color.
 */
export const calculateTileColor = (noise: number, lightLevel?: number): string => {
    let [r, g, b, a] = [0, 0, 0, 1];
    if (noise < 0.1) return `rgba(${r + 0}, ${g + 25}, ${b + 60}, ${a})`;
    if (noise < 0.2) return `rgba(${r + 0}, ${g + 25}, ${b + 125}, ${a})`;
    if (noise < 0.3) return `rgba(${r + 0}, ${g + 25}, ${b + 175}, ${a})`;
    if (noise < 0.4) return `rgba(${r + 0}, ${g + 25}, ${b + 200}, ${a})`;
    if (noise < 0.6) return `rgba(${r + 120}, ${g + 120}, ${b + 120}, ${a})`;
    if (noise < 0.7) return `rgba(${r + 180}, ${g + 180}, ${b + 180}, ${a})`;
    if (noise < 0.9) return `rgba(${r + 220}, ${g + 220}, ${b + 220}, ${a})`;
    return '#FFFFFF';
};

// TODO: Restructure to allow others to adapt the method. Add the offsets as conditional parameters?
export const generate2DSimplexNoise = (
    width: number,
    height: number,
    resolution: number = 4, // Maybe should be called 'scale' instead?
    offsetX: number = 0,
    offsetY: number = 0,
    seed?: string,
    iterations?: number
): number[][] => {
    const map: number[][] = [];
    const simplex = new SimplexNoise(seed);
    for (let i = 0; i < width; i++) {
        map[i] = [];
        for (let j = 0; j < height; j++) {
            map[i].push(
                simplex.noise2D(
                    (i / width) * resolution + offsetX,
                    (j / height) * resolution + offsetY
                ) /
                    2 +
                    0.5
            );
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

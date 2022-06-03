interface Tile {
    type: string;
    cell: [x: number, y: number];
    coords: [x: number, y: number];
    noise: number;
    render?(ctx: CanvasRenderingContext2D, coords: number[], noise: number): void;
}

export default Tile;

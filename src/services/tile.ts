// ? Should tileWidth and tileHeight be per tile?
export default interface ITile {
    type: string;
    cell: [x: number, y: number];
    coords: [x: number, y: number];
    tileWidth: number;
    tileHeight: number;
    noise: number;
    render?(...args: any): void;
}

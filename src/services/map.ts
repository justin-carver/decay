import ITile from './tile';

export default interface IMap {
    mapWidth: number;
    mapHeight: number;
    cellWidth?: number;
    cellHeight?: number;
    offsetX: number;
    offsetY: number;
    tiles: ITile[][];
    seed?: string;
    name?: string;
    historyLength?: number;
}

export const getCurrentSessionMap = (): IMap => {
    return {} as IMap;
};

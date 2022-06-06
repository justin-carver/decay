import ITile from './tile';

export default interface IWorld {
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

export const getCurrentSessionMap = (): IWorld => {
    return {} as IWorld;
};

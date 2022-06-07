import ITile from '../services/tile';

export interface IPlayer {
    char?: string;
    tile?: ITile;
    createPlayer(): IPlayer;
}

const Player: IPlayer = {
    char: '@',
    tile: {
        type: 'player',
        cell: [15, 15], // In integers
        coords: [16, 16], // In pixels
        tileWidth: 16, // *  Should come from engine config
        tileHeight: 16, // * Should come from engine config
        noise: 0,
        render: (ctx: CanvasRenderingContext2D) => {
            ctx.fillStyle = '#BB2266';
            ctx.fillRect(
                Player.tile?.coords[0] as number,
                Player.tile?.coords[1] as number,
                Player.tile?.tileWidth as number,
                Player.tile?.tileHeight as number
            );
        },
    } as ITile,
    createPlayer: () => {
        return Player;
    },
};

Object.preventExtensions(Player);
export default Player;

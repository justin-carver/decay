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
            if (Player.tile !== undefined) {
                ctx.fillStyle = '	#FFAA1D';
                ctx.fillRect(
                    Player.tile.coords[0],
                    Player.tile.coords[1],
                    Player.tile.tileWidth,
                    Player.tile.tileHeight
                );

                // // Tile Character
                // Adds a TON of lag.
                // ctx.fillStyle = '#000';
                // ctx.font = 'bold 18px monospace'; // TODO: Add to config.
                // ctx.fillText(
                //     '@',
                //     Player.tile.coords[0] + Player.tile.tileWidth / 2,
                //     Player.tile.coords[1] + Player.tile.tileHeight / 2
                // );
            }
        },
    } as ITile,
    createPlayer: () => {
        return Player;
    },
};

Object.preventExtensions(Player);
export default Player;

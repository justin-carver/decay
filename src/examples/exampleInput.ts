import { IPlayer } from '../components/player';
import { IInput } from '../services/input';

export const initInputActions = (
    input: IInput,
    player: IPlayer,
    updatePlayer: React.Dispatch<React.SetStateAction<IPlayer>>
) => {
    input.createNewInputAction({
        name: 'MOVE_LEFT',
        action: (player: IPlayer) => {
            if (player?.tile !== undefined) {
                updatePlayer(
                    Object.assign(
                        { ...player },
                        {
                            cell: [player.tile.cell[0] - 1, player.tile.cell[1]],
                            tile: {
                                ...player.tile,
                                coords: [
                                    (player.tile.coords[0] -= player.tile.tileWidth),
                                    player.tile.coords[1],
                                ],
                            },
                        }
                    )
                );
            }
        },
    });
    input.createNewInputAction({
        name: 'MOVE_RIGHT',
        action: (player: IPlayer) => {
            if (player?.tile !== undefined) {
                updatePlayer(
                    Object.assign(
                        { ...player },
                        {
                            tile: {
                                ...player.tile,
                                coords: [
                                    (player.tile.coords[0] += player.tile.tileWidth),
                                    player.tile.coords[1],
                                ],
                            },
                        }
                    )
                );
            }
        },
    });
    input.createNewInputAction({
        name: 'MOVE_UP',
        action: (player: IPlayer) => {
            if (player?.tile !== undefined) {
                updatePlayer(
                    Object.assign(
                        { ...player },
                        {
                            tile: {
                                ...player.tile,
                                coords: [
                                    player.tile.coords[0],
                                    (player.tile.coords[1] -= player.tile.tileWidth),
                                ],
                            },
                        }
                    )
                );
            }
        },
    });
    input.createNewInputAction({
        name: 'MOVE_DOWN',
        action: (player: IPlayer) => {
            if (player?.tile !== undefined) {
                updatePlayer(
                    Object.assign(
                        { ...player },
                        {
                            tile: {
                                ...player.tile,
                                coords: [
                                    player.tile.coords[0],
                                    (player.tile.coords[1] += player.tile.tileWidth),
                                ],
                            },
                        }
                    )
                );
            }
        },
    });
};

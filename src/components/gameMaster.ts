/**
 *  The GameMaster component works with information relating to
 *  player information, world information, session information,
 *  anything not related to the core framework of the engine.
 */
import IWorld from '../services/world';
import { generateWorld } from '../services/worldGen';

export enum GameModes {
    Roguelike,
    Adventure,
    Creative,
    Custom,
}

export interface IGameMaster {
    world: IWorld;
    config: object;
    update(...params: object[]): void;
    createGameMaster(): IGameMaster;
}

// GameMaster config will set initial world parameters.
export const initWorld = (): IWorld => {
    // TODO: These should be props of some kind.
    return generateWorld(
        100, // * engine.terminalWidth
        100, // * engine.terminalHeight
        0, // * OffsetX
        0, // * OffsetY
        undefined, // * ITile[][]
        16, // * canvas.tileWidth
        16, // * canvas.tileHeight
        'defaultMapSeed'
    );
};

export const GameMaster: IGameMaster = {
    world: initWorld(),
    config: {
        dev: 'stringy!!',
    },
    update: (...params: object[]) => {
        const keywords = ['update', 'createGameMaster']; // properties that are forbidden to update
        params.map((e: object) => {
            if (!keywords.includes(Object.keys(e)[0])) {
                // Make sure the key exists.
                if (GameMaster.hasOwnProperty(Object.keys(e)[0])) {
                    return Object.assign(GameMaster, e);
                } else {
                    throw new Error(
                        `Cannot update GameMaster with ${JSON.stringify(e)}, ${
                            Object.keys(e)[0]
                        } does not exist on this object.`
                    );
                }
            } else {
                throw new Error(
                    `Cannot update GameMaster object with ${JSON.stringify(e)}, '${
                        Object.keys(e)[0]
                    }' is a restricted keyword on this object and cannot be overwritten.\nPlease select a valid property.`
                );
            }
        });
    },
    createGameMaster: () => {
        return GameMaster;
    },
};

Object.preventExtensions(GameMaster);
export default GameMaster;

/**
 *  The GameMaster component works with information relating to
 *  player information, world information, session information,
 *  anything not related to the core framework of the engine.
 */
import React, { ReactElement, useEffect } from 'react';
import IWorld from '../services/world';
import { generateWorld } from '../services/worldGen';
import { useStore } from './Engine';

export enum GameModes {
    Roguelike,
    Adventure,
    Creative,
    Custom,
}

export interface IGameMaster {
    world: IWorld;
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

export const assignGameMaster = (gameMaster: IGameMaster) => {
    // Create Game Master context;
};

/**
 * GameMaster generates and creates the world as well.
 * @returns
 */
export const createGameMaster = (): IGameMaster => {
    let world: IWorld = initWorld();
    return {
        world: world,
    };
};

const GameMaster = (props: any): ReactElement => {
    // On component mount
    useStore((state: any) => state.initGameMaster)();
    return <>{props.children}</>;
};

export default GameMaster;

import React, { ReactElement, useEffect, useRef } from 'react';
import IMap from '../services/map';

export const GMContext = React.createContext({});

export enum GameModes {
    Roguelike,
    Adventure,
    Creative,
    Custom,
}

export interface IGameMaster {
    sessionMap: IMap;
    difficulty: number;
}

export const assignGameMaster = (gameMaster: IGameMaster) => {
    // Create Game Master context;
};

export const createGameMaster = (): IGameMaster => {
    return {
        sessionMap: {} as IMap,
        difficulty: 1,
    };
};

const GameMaster = (props: any): ReactElement => {
    let gm = useRef<IGameMaster>();
    if (props.importGameMaster === undefined) {
        gm.current = createGameMaster();
    }
    useEffect(() => {
        console.log(gm); // TODO: Verify global GameMaster ref within context.
        //  Should output all tiles, all information about the running games,
        //  which will feed into the context providers.
    }, []);
    return <GMContext.Provider value={gm}>{props.children}</GMContext.Provider>;
};

export default GameMaster;

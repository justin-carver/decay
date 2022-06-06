// TODO: Engine needs to be camelCase instead of Component naming.

/**
 *  The Engine component is responsible for holding core framework
 *  logic, state management, store, world generation, pathfinding, FOV, etc.
 */
import React, { ReactElement } from 'react';
import create from 'zustand';
import { createGameMaster } from './GameMaster';

// Store template -- // TODO: Create Interface at some point.
export const useStore: any = create((set: any) => ({
    gameMaster: {}, // tiles store in this obj
    initGameMaster: () => set((state: any) => ({ gameMaster: createGameMaster() })),
}));

// TODO: Should Engine become a React component?
const Engine = (props: any): ReactElement => {
    return <>{props.children}</>;
};

export default Engine;

/**
 *  The Engine component is responsible for holding core framework
 *  logic, state management, store, world generation, pathfinding, FOV, etc.
 */

interface IEngine {}

export const initEngine = (): object => {
    // global engine object
    return {};
};

const Engine: IEngine = {
    gameMaster: {},
};

Object.preventExtensions(Engine);
export default Engine;

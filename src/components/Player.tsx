import { ReactElement, useEffect } from 'react';
import { useStore } from './Engine';

export interface IPlayer {
    char: string;
}

// ? Should this be a react component or something more behind the scenes?
const Player = (props: any): ReactElement => {
    return { ...props.children };
};

export default Player;

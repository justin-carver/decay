import { ReactElement, useEffect, useState } from 'react';
import Decay from '../Decay';
import DecayCanvas from '../components/DecayCanvas';
import GameMaster from '../components/gameMaster';
import Player, { IPlayer } from '../components/player';
import Input from '../services/input';
import { initInputActions } from './exampleInput';

// App.tsx represents final product for end user.
const App = (): ReactElement => {
    const [player, updatePlayer] = useState(Player.createPlayer());
    const [gm, updateGameMaster] = useState(GameMaster.createGameMaster());
    const [input, updateInput] = useState(Input.createInput());

    // Init custom input commands and their respective functions.
    initInputActions(input, player, updatePlayer);

    useEffect(() => {
        // Add event listener for input manager.
        document.addEventListener('keydown', (e) => {
            if (player.tile !== undefined) {
                if (e.code === 'ArrowLeft') {
                    input.queueAction('MOVE_LEFT', player);
                }
                if (e.code === 'ArrowRight') {
                    input.queueAction('MOVE_RIGHT', player);
                }
                if (e.code === 'ArrowUp') {
                    input.queueAction('MOVE_UP', player);
                }
                if (e.code === 'ArrowDown') {
                    input.queueAction('MOVE_DOWN', player);
                }
            }
        });
    }, []);
    return (
        <Decay>
            <DecayCanvas
                gameMaster={gm}
                player={player}
                canvasConfig={{
                    terminalWidth: 10,
                    terminalHeight: 100,
                    tileWidth: 16,
                    tileHeight: 16,
                }}
            />
        </Decay>
    );
};

export default App;

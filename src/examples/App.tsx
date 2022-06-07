import { MutableRefObject, ReactElement, useEffect, useState, useRef } from 'react';
import Decay from '../Decay';
import DecayCanvas from '../components/DecayCanvas';
import GameMaster from '../components/gameMaster';
import Player from '../components/player';

// App.tsx represents final product for end user.
const App = (): ReactElement => {
    const [player, setPlayer] = useState(Player.createPlayer());
    const [gm, setGameMaster] = useState(GameMaster.createGameMaster());
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            // e.preventDefault();
            if (player.tile !== undefined) {
                if (e.code === 'ArrowRight') {
                    console.log('movin!', player.tile.coords[1]);
                    setPlayer(
                        Object.assign(player, {
                            tile: {
                                ...player.tile,
                                coords: [
                                    player.tile.coords[0],
                                    player.tile.coords[1] + player.tile.tileWidth,
                                ],
                            },
                        })
                    );
                }
            }
        });
    }, [player]);
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

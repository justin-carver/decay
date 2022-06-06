import { ReactElement, useEffect } from 'react';
import Decay from '../Decay';
import DecayCanvas from '../components/DecayCanvas';
import GameMaster from '../components/GameMaster';

// App.tsx represents final product for end user.
const App = (): ReactElement => {
    useEffect(() => {
        // setOffsetX(offsetX + 1);
    });

    return (
        <Decay>
            <GameMaster />
            <DecayCanvas
                canvasConfig={{
                    terminalWidth: 100,
                    terminalHeight: 100,
                    tileWidth: 16,
                    tileHeight: 16,
                }}
            />
        </Decay>
    );
};

export default App;

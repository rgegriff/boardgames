import { Component } from "react";
import { Client, Lobby } from "boardgame.io/react";
import { SuperTicTacToe } from "./Game";
import { SuperTicTacToeBoard } from "./Board";
import { SocketIO } from "boardgame.io/multiplayer";

class App extends Component {
  render() {

    return (
      <Lobby 
        gameServer={`http://${window.location.hostname}:8080`}
        lobbyServer={`http://${window.location.hostname}:8080`}
        gameComponents={[
          { game: SuperTicTacToe, board: SuperTicTacToeBoard }
        ]}
      />
    );
  }
}

export default App;

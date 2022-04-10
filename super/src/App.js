import { Component, React } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Client, Lobby } from "boardgame.io/react";
import { SuperTicTacToe } from "./Game";
import { SuperTicTacToeBoard } from "./Board";
import { SocketIO } from "boardgame.io/multiplayer";

const SuperTicTacToeClient = Client({
  game: SuperTicTacToe,
  board: SuperTicTacToeBoard,
});

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route
            index
            element={
              <Lobby
                gameServer={`http://${window.location.hostname}:8080`}
                lobbyServer={`http://${window.location.hostname}:8080`}
                gameComponents={[
                  { game: SuperTicTacToe, board: SuperTicTacToeBoard },
                ]}
              />
            }
          />
          <Route path="/debugsttt" element={<SuperTicTacToeClient />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

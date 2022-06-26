import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { Team } from "./models";

function App() {
  const [data, setData] = useState<Team[]>();
  useEffect(() => {
    (async () => {
      const test: Team[] = await (await fetch("/api/teams")).json();
      setData(test);
    })();

    return () => {};
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {data && data.map((team: Team) => <div key={team.id}>{team.year}</div>)}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

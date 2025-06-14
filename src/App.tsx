import React from 'react';
import './App.css';
import './components/table/Table';
import Table from './components/table/Table';
import Panel from './components/Panel/Panel';
import TelegramWebAppAuth from './TelegramWebAppAuth';

function App() {
  return (
    <div className="App">
      <TelegramWebAppAuth/>
      <Panel/>
      <Table/>
    </div>
  );
}

export default App;

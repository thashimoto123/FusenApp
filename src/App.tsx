import React from 'react';
import InputWithSuggestion from 'components/InputWithSuggestion';
import BrdCard from 'components/BrdCard';
import ContextMenu from 'components/ContextMenu';

function App() {
  return (
    <div className="App">
      <BrdCard text={'にゃんぼ！'} color={'white'} position={{x: 100, y: 400, z: 1}} />
      <InputWithSuggestion />
      <ContextMenu position={{x: 500, y: 500}}/>
    </div>
  );
}

export default App;

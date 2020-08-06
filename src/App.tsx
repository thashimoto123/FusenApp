import React from 'react';
import InputWithSuggestion from 'components/InputWithSuggestion';
import BrdCard from 'components/BrdCard';

function App() {
  return (
    <div className="App">
      <BrdCard text={'にゃんぼ！'} color={'white'} position={{x: 100, y: 400, z: 1}} />
      <InputWithSuggestion />
    </div>
  );
}

export default App;

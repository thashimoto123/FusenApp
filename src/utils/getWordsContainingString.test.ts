import getWordsContainingString from 'getWordsContainingString';
describe('getWordsContainingString', () => {
  test('「あいうえお」を入力して、「アイウエオ」を出力', () => {
    const words = ['アイウエオ'];
    const hits = getWordsContainingString('あいうえお', words);
    expect(hits[0]).toBe('アイウエオ');
  });

  test('「アイウエオ」を入力して、「あいうえお」を出力', () => {
    const words = ['あいうえお'];
    const hits = getWordsContainingString('アイウエオ', words);
    expect(hits[0]).toBe('あいうえお');
  });

  test('「abcde」を入力して、「ABCDE」を出力', () => {
    const words = ['ABCDE'];
    const hits = getWordsContainingString('abcde', words);
    expect(hits[0]).toBe('ABCDE');
  });

  test('「ABCDE」を入力して、「abcde」を出力', () => {
    const words = ['abcde'];
    const hits = getWordsContainingString('ABCDE', words);
    expect(hits[0]).toBe('abcde');
  });

  test('「abcDEF」を入力して、「ABCdef」を出力', () => {
    const words = ['ABCdef'];
    const hits = getWordsContainingString('abcDEF', words);
    expect(hits[0]).toBe('ABCdef');
  });

  test('「漢字」を入力して、「漢字」を出力', () => {
    const words = ['漢字'];
    const hits = getWordsContainingString('漢字', words);
    expect(hits[0]).toBe('漢字');
  });

  test('「リンゴ」を入力して「リンゴ」「りんご」を出力', () => {
    const words = ['リンゴ', 'りんご', 'apple'];
    const hits = getWordsContainingString('リンゴ', words);
    expect(hits.length === 2).toBeTruthy();
    expect(hits.includes('リンゴ')).toBeTruthy();
    expect(hits.includes('りんご')).toBeTruthy();
  });

  test('「00aa」を入力して「00aa」を出力', () => {
    const words = ['00aa', 'りんご', 'apple'];
    const hits = getWordsContainingString('00aa', words);
    expect(hits.length === 1).toBeTruthy();
    expect(hits.includes('00aa')).toBeTruthy();
  });
});
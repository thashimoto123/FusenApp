interface Converter {
    (str: string): string;
}

const kana2hira: Converter = (str:string): string => {
    return str.replace(/[\u30a1-\u30f6]/g, (match: string):string => {
        const chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    })
}

const hira2kana: Converter = (str: string): string => {
    return str.replace(/[\u3041-\u3096]/g, (match: string) => {
        const chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    })
}

const lower2upper: Converter = (str: string): string => {
    return str.toUpperCase();
}

const upper2lower: Converter = (str: string): string => {
    return str.toLowerCase();
}


const createSearchPattern = (str: string, converters: Converter[]):string => {
    let convertedWords:string[] = converters.map((converter):string => {
        return converter(str);
    });
    let pattern:string = '';
    for (let i = 0; i < str.length; i++) {
        pattern += '[';
        convertedWords.forEach(convertedWord => {
           pattern +=  convertedWord[i];
        })
        pattern += ']';
    }
    pattern += '.*$';
    return pattern;
}

const getWordsContainingString = (str: string, words: string[]): string[] => {
    if (str === '') return [];
    const converters = [hira2kana, kana2hira, upper2lower, lower2upper];
    const pattern = createSearchPattern(str, converters);
    const reg = new RegExp(pattern);
    const hits:string[] = [];

    for (let i = 0; i < words.length; i++) {
        if (words[i].match(reg)) hits.push(words[i]);
    }

    return hits;
}

export default getWordsContainingString;
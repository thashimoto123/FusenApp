interface Option {
  key: string;
  handler: (...args: any[]) => void;
  control?: boolean;
}

const createKeydownHandler = (option: Option) => {
  return (ev: KeyboardEvent): any =>  {
    if (ev.key === option.key  && ev.ctrlKey === !!option.control) {
      return option.handler(ev);
    }
  }
}

export default createKeydownHandler;
const createKeydownHandler = (option: {
  key: string,
  handler: (...args: any[]) => any,
  control?: boolean,
}) => {
  return (ev: KeyboardEvent): any =>  {
    if (ev.key === option.key  && ev.ctrlKey === !!option.control) {
      return option.handler(ev);
    }
  }
}

export default createKeydownHandler;
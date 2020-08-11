export type Card  = {
  id: string,
  text: string,
  color: string,
  label: {
    [name: string]: string
  },
  position: {
    x: number,
    y: number,
    z: number
  }
}
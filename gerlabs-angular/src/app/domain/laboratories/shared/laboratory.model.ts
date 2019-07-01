export class Laboratory{
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public capacity: string,
    public hardware: string,
    public software: string,
    public equipment: string,
    public description?: string
  ){}
}
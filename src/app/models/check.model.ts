export class Check {
    constructor(
    public id: any | undefined,
    public number: number,
    public amount:number,
    public signature:string,
    public signer:any,
    public recipient:any,
    public state:string
    )
    {
    }

}
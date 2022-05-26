import { Check } from "./check.model";

export class Account {
    constructor(
        public id: any,
        public address: any,
        public checks:Check[]
    )
    {

    }
}
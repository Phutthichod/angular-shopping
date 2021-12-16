export interface Player {
    id: number| null;
    name: string;
    value: number;
}

export const players: Player[] = [
    {
        id:1,
        name:"messi",
        value:200
    },
    {
        id:2,
        name:"fred",
        value:100
    }
]
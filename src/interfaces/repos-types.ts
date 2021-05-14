
export interface INode {
    node: {
        forkCount: number
        id: string
        name: string
        stargazerCount: number
        url: string
    }
}

export interface IRepositories<T> {
    search: {
        edges: T[]
    }
}

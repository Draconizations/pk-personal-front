export interface Member {
    name: string,
    uuid?: string,
    id: string,
    display_name?: string,
    description?: string,
    birthday?: string,
    avatar_url?: string,
    banner?: string,
    color?: string,
    pronouns?: string,
    created?: string
}

export interface Front {
    id: string,
    timestamp: string,
    members?: Member[]
}

export interface Group {
    id: string,
    uuid?: string,
    name: string,
    display_name?: string,
    description?: string,
    icon?: string,
    banner?: string,
    color?: string,
    created: string
}
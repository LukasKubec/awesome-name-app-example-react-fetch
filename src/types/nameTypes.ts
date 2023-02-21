interface NameRequest {
    name: string;
}

interface NameResponse {
    age: number;
    name: string;
    count: number;
}

interface NameError {
    error: string;
}

export type {
    NameRequest,
    NameResponse,
    NameError,
}

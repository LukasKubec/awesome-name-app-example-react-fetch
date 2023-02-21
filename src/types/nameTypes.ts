interface NameRequest {
    name: string;
}

interface NameResponse {
    age: number;
    name: string;
    count: number;
}

const nameResponseTypeGuard = (response: NameResponse | unknown): response is NameResponse =>
    (response as NameResponse).age !== undefined;

interface NameError {
    error: string;
}

const NameErrorTypeGuard = (error: NameError | unknown | undefined): error is NameError =>
    (error as NameError).error !== undefined;

export type { NameRequest, NameResponse, NameError };

export { nameResponseTypeGuard, NameErrorTypeGuard };

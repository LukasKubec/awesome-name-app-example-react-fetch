import { useState } from "react";
import axios from "axios";
import { ApiState, INITIAL_STATE } from "../../../types";

type Method<RQ> = {
    method: "GET" | "POST";
    data?: RQ;
};

export interface FetchParams<RQ> {
    url: string;
    method: Method<RQ>;
}

interface UseAxios<RS, E> {
    apiState: ApiState<RS, E>;
    fetchData: <RQ>(data: FetchParams<RQ>) => Promise<void>;
    invalidateState: () => void;
}

export const useAxios = <RS, E>(): UseAxios<RS, E> => {
    const [response, setResponse] = useState<ApiState<RS, E>>(INITIAL_STATE);

    const invalidateState = () => {
        setResponse(INITIAL_STATE);
    }

    const fetchData = async <RQ>({ url, method }: FetchParams<RQ>) => {
        try {
            setResponse({
                loading: true,
                success: false,
                error: undefined,
                data: undefined
            });
            const response = await axios.request({
                url,
                method: method.method,
                data: method.method === "POST" ? method.data : undefined,
                params: method.method === "GET" ? method.data : undefined
            });
            setResponse({
                loading: false,
                success: true,
                error: undefined,
                data: response.data
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponse({
                    loading: false,
                    success: false,
                    error: error.response?.data,
                    data: undefined
                });
            }
        }
    };

    return {
        apiState: response,
        fetchData,
        invalidateState
    };
};

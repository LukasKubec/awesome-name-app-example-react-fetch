import { useEffect, useState } from "react";
import { ApiState, INITIAL_STATE, NameRequest } from "../../../types";
import axios from "axios";

interface UseFetchData<RS, E> {
    loading: boolean;
    success: boolean;
    error?: E;
    data?: RS;
    handleSetData: (data: NameRequest) => void;
    invalidDate: () => void;
}

interface UseFetchDataProps<RS, E> {
    url?: string;
    genericResponseTypeGuard: (response: RS | unknown) => response is RS;
    genericTypeError?: E;
    genericErrorTypeGuard: (error: E | unknown | undefined) => error is E;
}

const DEFAULT_URL = "https://api.agify.io";

export const useFetchData = <RS, E>({
    url = DEFAULT_URL,
    genericResponseTypeGuard,
    genericTypeError,
    genericErrorTypeGuard
}: UseFetchDataProps<RS, E>): UseFetchData<RS, E> => {
    const [response, setResponse] = useState<ApiState<RS, E>>(INITIAL_STATE);
    const [data, setData] = useState<NameRequest | undefined>(undefined);

    const handleSetData = (data: NameRequest) => {
        setData(data);
    };

    const invalidDate = () => {
        setData(undefined);
        setResponse(INITIAL_STATE);
    };

    useEffect(() => {
        if (data) {
            (async () => {
                try {
                    setResponse({
                        loading: true,
                        success: false,
                        error: undefined,
                        data: undefined
                    });
                    const response = await axios.request({
                        url,
                        method: "GET",
                        params: data
                    });
                    if (genericResponseTypeGuard(response.data)) {
                        setResponse({
                            loading: false,
                            success: true,
                            error: undefined,
                            data: response.data
                        });
                    } else {
                        if (genericTypeError) {
                            setResponse({
                                loading: false,
                                success: false,
                                error: genericTypeError,
                                data: undefined
                            });
                        } else {
                            console.error("Response type is incorrect");
                            setResponse(INITIAL_STATE)
                        }
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (genericErrorTypeGuard(error.response?.data)) {
                            setResponse({
                                loading: false,
                                success: false,
                                error: error.response?.data,
                                data: undefined
                            });
                        } else {
                            console.error("Unknown error");
                            console.error(error.response?.data);
                            setResponse(INITIAL_STATE)
                        }
                    }
                }
            })();
        }
        return () => {
            setResponse(INITIAL_STATE);
        };
    }, [data]);

    return {
        loading: response.loading,
        success: response.success,
        error: response.error,
        data: response.data,
        handleSetData,
        invalidDate
    };
};

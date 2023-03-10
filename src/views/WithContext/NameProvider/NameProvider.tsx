import { ReactNode, useEffect, useState } from "react";
import { nameContext, useAxios } from "../../../lib";
import {
    NameError,
    NameErrorTypeGuard,
    NameRequest,
    NameResponse,
    nameResponseTypeGuard
} from "../../../types";

interface NameProviderProps {
    children: ReactNode;
}

const NameContextProvider = nameContext.Provider;

export const NameProvider = ({ children }: NameProviderProps): JSX.Element => {
    const [data, setData] = useState<NameRequest | undefined>(undefined);
    const { fetchData, apiState, invalidateState } = useAxios<NameRequest, NameResponse, NameError>(
        {
            genericResponseTypeGuard: nameResponseTypeGuard,
            genericErrorTypeGuard: NameErrorTypeGuard
        }
    );

    const handleRequestData = (data: NameRequest): void => {
        setData(data);
    };

    const invalidate = () => {
        setData(undefined);
        invalidateState();
    };

    useEffect(() => {
        if (data) {
            (async () =>
                await fetchData({
                    url: "https://api.agify.io",
                    method: {
                        data,
                        method: "GET"
                    },
                    genericTypeError: {
                        error: "Incorrect response type"
                    }
                }))();
        }
        return () => {
            setData(undefined);
        };
    }, [data]);

    return (
        <NameContextProvider
            value={{ response: apiState, setRequestData: handleRequestData, invalidate }}
            children={children}
        />
    );
};

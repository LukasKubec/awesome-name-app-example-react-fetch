import { ReactNode, useEffect, useState } from "react";
import { nameContext, useAxios } from "../../../lib";
import { NameError, NameRequest, NameResponse } from "../../../types";

interface NameProviderProps {
    children: ReactNode;
}

const NameContextProvider = nameContext.Provider;

export const NameProvider = ({ children }: NameProviderProps): JSX.Element => {
    const [data, setData] = useState<NameRequest | undefined>(undefined);
    const { fetchData, apiState, invalidateState } = useAxios<NameResponse, NameError>();
    const handleRequestData = (data: NameRequest): void => {
        setData(data);
    };

    const invalidate = () => {
        setData(undefined);
        invalidateState();
    }

    useEffect(() => {
        if (data) {
            (async() => await fetchData({
                url: "https://api.agify.io",
                method: {
                    data,
                    method: "GET"
                }
            }))();
        }
    }, [data]);

    return (
        <NameContextProvider
            value={{ response: apiState, setRequestData: handleRequestData, invalidate }}
            children={children}
        />
    );
};

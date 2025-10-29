import { useEffect, useMemo, useState } from "react";
import { SSEContext } from "./SSEContext";
import { SubscriptionManager, createSubsManager } from "./SubscriptionManager";
import { BACKEND_HTTP_URL_ROOT  } from "../utils/constants";

export function SSEProvider({ children }: { children: JSX.Element}) {
    const [subManager, setSubManager] = useState<SubscriptionManager>()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [connected, setConnected] = useState<boolean>(false);



    useEffect(() => {
        if (BACKEND_HTTP_URL_ROOT) {
            setLoading(true);
            setConnected(false);
            setError(null);
            const subManager = createSubsManager(BACKEND_HTTP_URL_ROOT)
            setSubManager(subManager);
            subManager.onConnect(() => {
                setLoading(false);
                setConnected(true);
            })
            subManager.onError((error) => {
                setLoading(false);
                setConnected(false);

                setError(error);
            })
            subManager.connect()
        }
        return () => {
            console.log('qweqew')
            subManager?.close();
        }
    }, [subManager])

    return (
        <SSEContext.Provider value={useMemo(() => ({ connected, loading, error, subscribe: subManager?.subscribe, unsubscribe: subManager?.unsubscribe }), [connected, loading, error, subManager])}>
            {children}
        </SSEContext.Provider>
    )
}
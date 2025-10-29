import { createContext } from "react";

export type Subscription = {
    subscriberId: string,
    provider: string,
    event: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (data: any) => void
}

interface SSEContextType {
    connected: boolean,
    loading: boolean,
    error: Error | null,
    subscribe: ((Subscription: Subscription) => Promise<Error | null>) | undefined,
    unsubscribe: ((subscriberId: string) => void) | undefined,
}

export const SSEContext = createContext<SSEContextType>({} as SSEContextType)

export default SSEContext;
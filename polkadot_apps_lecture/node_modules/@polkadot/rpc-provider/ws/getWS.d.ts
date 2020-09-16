export declare function getWSClass(): Promise<[typeof WebSocket, boolean]>;
export declare function createWS(endpoint: string, headers?: Record<string, string>): Promise<WebSocket>;

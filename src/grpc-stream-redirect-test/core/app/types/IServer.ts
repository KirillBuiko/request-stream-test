import {ServerConfigType} from "@src/grpc-stream-redirect-test/core/app/types/ServerConfigType";
import {IRequestManager} from "@src/grpc-stream-redirect-test/core/app/types/IRequestManager";

export type ServerStatus = "on" | "off";

export interface IServer {
    status: ServerStatus;

    start(config: ServerConfigType, requestManager: IRequestManager): Promise<Error | null>;
    stop(): Promise<Error | undefined>;
}
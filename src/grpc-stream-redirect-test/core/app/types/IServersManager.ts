import {ServerConfigsType} from "@src/grpc-stream-redirect-test/core/app/types/ServerConfigType";
import {IRequestManager} from "@src/grpc-stream-redirect-test/core/app/types/IRequestManager";

export interface IServersManager {
    startAll(configs: ServerConfigsType, requestManager: IRequestManager): Promise<void>;
    stopAll(): void;
}

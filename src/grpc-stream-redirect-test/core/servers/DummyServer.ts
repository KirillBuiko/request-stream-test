import type {IServer, ServerStatus} from "@src/grpc-stream-redirect-test/core/app/types/IServer";
import type {ServerConfigType} from "@src/grpc-stream-redirect-test/core/app/types/ServerConfigType";

export class RestApiServer implements IServer{
    status: ServerStatus = "off";

    constructor() {

    }

    start(config: ServerConfigType): Promise<Error | null> {
        this.status = "on";
        return Promise.resolve(null);
    }

    stop(): Promise<Error | undefined> {
        this.status = "off";
        return Promise.resolve(undefined);
    }
}
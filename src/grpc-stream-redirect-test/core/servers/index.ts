import {ServerName} from "@src/grpc-stream-redirect-test/core/app/types/ServerConfigType";
import {IServer} from "@src/grpc-stream-redirect-test/core/app/types/IServer";
import {RestApiServer} from "@src/grpc-stream-redirect-test/core/servers/RestApiServer";
import {GrpcServer} from "@src/grpc-stream-redirect-test/core/servers/GrpcServer";

export const servers: {[server in ServerName]: IServer} = {
    "rest-api-server": new RestApiServer(),
    "grpc-server": new GrpcServer()
}
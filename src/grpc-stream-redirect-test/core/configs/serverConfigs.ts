import {ServerConfigsType} from "@src/grpc-stream-redirect-test/core/app/types/ServerConfigType";

export const serverConfigs: ServerConfigsType = {
    "grpc-server": {port: 50051},
    "rest-api-server": {port: 50052}
}
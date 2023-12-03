import {ServersManager} from "@src/grpc-stream-redirect-test/core/servers/ServersManager";
import {serverConfigs} from "@src/grpc-stream-redirect-test/core/configs/serverConfigs";
import {EndpointsManager} from "@src/grpc-stream-redirect-test/core/endpoints/EndpointsManager";
import {endpointConfigs} from "@src/grpc-stream-redirect-test/core/configs/endpointsConfigs";
import {RequestManager} from "@src/grpc-stream-redirect-test/core/request-manager/RequestManager";
import {ProtocolType, RequestName} from "@src/grpc-stream-redirect-test/core/types/Types";
import {RequestType} from "@grpc-build/build/RequestType";

const serversManager = new ServersManager();
const endpointsManager = new EndpointsManager();
const requestsManager = new RequestManager(endpointsManager);

async function main() {
    try {
        await endpointsManager.initAll(endpointConfigs);
        await serversManager.startAll(serverConfigs, requestsManager);
        requestsManager.register({
            requestName: RequestName.GET,
            protocol: ProtocolType.REST_API
        }, {
            requestType: RequestType.VARIABLE
        })
    }
    catch (e) {
        console.log("Core start failed");
    }
}

main();

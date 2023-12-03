import {IEndpointsManager} from "@src/grpc-stream-redirect-test/core/app/types/IEndpointsManager";
import {EndpointConfigsType, EndpointName} from "@src/grpc-stream-redirect-test/core/app/types/EndpointConfigType";
import {endpoints} from ".";

export class EndpointsManager implements IEndpointsManager {
    getEndpoint(endpointName: EndpointName) {
        return endpoints[endpointName];
    }

    async initAll(configs: EndpointConfigsType) {
        console.log("Endpoints are initiating");
        const promises = Object.keys(endpoints).map(async endpointName => {
            const endpoint = endpoints[endpointName as EndpointName];
            const config = configs[endpointName as EndpointName];
            const err = await endpoint.init(config);
            if (err) {
                console.log(`The endpoint "${endpointName}" init attempt failed with error: ${err.message}`);
                throw err;
            } else {
                console.log(`The endpoint "${endpointName}" connected to host ${config.host}`);
            }
        });
        await Promise.allSettled(promises);
        console.log("Endpoints init finished");
    }
}
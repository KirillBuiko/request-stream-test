import {EndpointConfigsType, EndpointName} from "@src/grpc-stream-redirect-test/core/app/types/EndpointConfigType";
import {IEndpoint} from "@src/grpc-stream-redirect-test/core/app/types/IEndpoint";

export interface IEndpointsManager {
    initAll(configs: EndpointConfigsType): Promise<void>;
    getEndpoint(endpointName: EndpointName): IEndpoint;
}
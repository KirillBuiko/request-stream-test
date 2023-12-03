import {
    NarrowedDestinationOptionsType, ProtocolType,
    RequestName,
} from "@src/grpc-stream-redirect-test/core/types/Types";
import {GetRequestInfo} from "@grpc-build/build/GetRequestInfo";
import {DataRequestInfo} from "@grpc-build/build/DataRequestInfo";
import {EndpointConfigType} from "@src/grpc-stream-redirect-test/core/app/types/EndpointConfigType";

export type EndpointStatus = "connected" | "not-connected";

export interface IEndpoint {
    status: EndpointStatus;

    init(config: EndpointConfigType): Promise<Error | null>;

    send<RequestT, ResponseT, RequestN extends RequestName>
    (requestName: RequestName, info: GetRequestInfo | DataRequestInfo):
        NarrowedDestinationOptionsType<ProtocolType.GRPC, RequestName>;
}



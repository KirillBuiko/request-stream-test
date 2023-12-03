import {RequestType__Output} from "@grpc-build/build/RequestType";
import {
    DestinationOptionsType,
    SourceOptionsType
} from "@src/grpc-stream-redirect-test/core/types/Types";
import {RequestRouter} from "@src/grpc-stream-redirect-test/core/request-manager/RequestRouter";
import {IEndpointsManager} from "@src/grpc-stream-redirect-test/core/app/types/IEndpointsManager";
import {IRequestManager} from "@src/grpc-stream-redirect-test/core/app/types/IRequestManager";
import {GetRequestInfo} from "@grpc-build/build/GetRequestInfo";
import {DataRequestInfo} from "@grpc-build/build/DataRequestInfo";

export class RequestManager implements IRequestManager{
    router = new RequestRouter();

    constructor(private endpointsManager: IEndpointsManager) {}

    register(sourceOptions: SourceOptionsType, info: GetRequestInfo | DataRequestInfo) {
        const destName =
            this.router.getEndpointName(info.requestType as RequestType__Output, sourceOptions.requestName);
        let destOptions: DestinationOptionsType | undefined;
        if (destName) {
            try {
                destOptions = this.endpointsManager.getEndpoint(destName).send(sourceOptions.requestName, info);
            } catch (e) {
                console.log(`Failed to ${sourceOptions.requestName} 
                ${info.requestType} from ${sourceOptions.protocol} to ${destName}`);
            }
        }
        // Build pipeline
    }
}
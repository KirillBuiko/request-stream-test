import {SourceOptionsType} from "@src/grpc-stream-redirect-test/core/types/Types";
import {GetRequestInfo} from "@grpc-build/build/GetRequestInfo";
import {DataRequestInfo} from "@grpc-build/build/DataRequestInfo";

export interface IRequestManager {
    register(sourceOptions: SourceOptionsType, info: GetRequestInfo | DataRequestInfo): void;
}

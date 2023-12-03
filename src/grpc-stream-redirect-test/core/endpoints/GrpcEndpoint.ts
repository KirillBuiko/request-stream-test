import {EndpointStatus, IEndpoint} from "@src/grpc-stream-redirect-test/core/app/types/IEndpoint";
import {
    NarrowedDestinationOptionsType,
    ProtocolType,
    RequestName
} from "@src/grpc-stream-redirect-test/core/types/Types";
import {EndpointConfigType} from "@src/grpc-stream-redirect-test/core/app/types/EndpointConfigType";
import * as protoLoader from "@grpc/proto-loader";
import {grpcLoadOptions} from "@src/grpc-stream-test/grpcLoadOptions";
import * as grpc from "@grpc/grpc-js";
import {ProtoGrpcType} from "@grpc-build/build/data_requests";
import {GetRequestInfo, GetRequestInfo__Output} from "@grpc-build/build/GetRequestInfo";
import {DataRequestInfo} from "@grpc-build/build/DataRequestInfo";
import {ClientWritableStream, waitForClientReady} from "@grpc/grpc-js";
import {DataStream} from "@grpc-build/build/DataStream";
import {configs} from "@src/grpc-stream-redirect-test/core/configs/configs";

export class GrpcEndpoint implements IEndpoint {
    status: EndpointStatus = "not-connected"
    client: InstanceType<ProtoGrpcType["DataRequests"]> | undefined;

    init(config: EndpointConfigType): Promise<Error | null> {
        const packageDefinition = protoLoader.loadSync('./grpc/data_requests.proto', grpcLoadOptions);
        const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
        this.client = new proto.DataRequests(config.host, grpc.credentials.createInsecure());
        return new Promise(resolve => {
            waitForClientReady(this.client!, Date.now() + configs.ENDPOINT_CONNECTION_DEADLINE, error => {
                if (!error) {
                    this.status = "connected";
                }
                resolve(error === undefined ? null : error);
            })
        })
    }

    send<RequestN extends RequestName>
    (requestName: RequestN, info: GetRequestInfo | DataRequestInfo):
        NarrowedDestinationOptionsType<ProtocolType.GRPC, RequestName> {
        if (this.status !== "connected") return {protocol: ProtocolType.GRPC, requestName};
        switch (requestName) {
            case RequestName.GET:
                return this.getHandler(info as GetRequestInfo);
            case RequestName.SET:
                return this.setHandler(info as DataRequestInfo);
        }
        return {protocol: ProtocolType.GRPC, requestName}
    }

    private getHandler(info: GetRequestInfo):
        NarrowedDestinationOptionsType<ProtocolType.GRPC, RequestName.GET> {
        const get = this.client!.get(info);
        return {
            requestName: RequestName.GET,
            protocol: ProtocolType.GRPC,
            destReader: get
        }
    }

    private setHandler(info: DataRequestInfo):
        NarrowedDestinationOptionsType<ProtocolType.GRPC, RequestName.SET> {
        let writer: ClientWritableStream<DataStream> | undefined = undefined;
        // TODO: push info in writer stream
        const reader = new Promise<GetRequestInfo__Output>((resolve, reject) => {
            writer = this.client!.set((err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value as GetRequestInfo__Output);
                }
            });
        })

        return {
            requestName: RequestName.SET,
            protocol: ProtocolType.GRPC,
            destReader: reader,
            destWriter: writer
        }
    }
}



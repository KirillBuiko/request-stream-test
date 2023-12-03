import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {ProtoGrpcType} from "@grpc-build/build/data_requests";
import {grpcLoadOptions} from "@grpc-build/grpcLoadOptions";
import type {IServer, ServerStatus} from "@src/grpc-stream-redirect-test/core/app/types/IServer";
import {DataRequestsHandlers} from "@grpc-build/build/DataRequests";
import {ServerConfigType} from "@src/grpc-stream-redirect-test/core/app/types/ServerConfigType";
import {IRequestManager} from "@src/grpc-stream-redirect-test/core/app/types/IRequestManager";
import {ProtocolType, RequestName} from "@src/grpc-stream-redirect-test/core/types/Types";

export class GrpcServer implements IServer {
    server = new grpc.Server();
    status: ServerStatus = "off";
    requestManager: IRequestManager | undefined = undefined;

    constructor() {
        const packageDefinition = protoLoader.loadSync('./grpc/data_requests.proto', grpcLoadOptions);
        const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
        this.server.addService(proto.DataRequests.service, {
            Get: (call) =>
                this.getHandler(call),
            Set: (call, callback) =>
                this.setHandler(call, callback)
        } as DataRequestsHandlers);
    }

    start(config: ServerConfigType, requestManager: IRequestManager): Promise<Error | null> {
        this.requestManager = requestManager;
        return new Promise((resolve) => {
            this.server.bindAsync(`0.0.0.0:${config.port}`,
                grpc.ServerCredentials.createInsecure(), (error) => {
                if (!error) {
                    this.server.start();
                    this.status = "on";
                }
                resolve(error);
            });
        })
    }

    stop(): Promise<Error | undefined> {
        return new Promise((resolve) => {
            this.server.tryShutdown(error => {
                if(!error) {
                    this.status = "off";
                }
                resolve(error);
            });
        });
    }

    getHandler: DataRequestsHandlers["Get"] = (call) => {
        this.requestManager?.register({
            protocol: ProtocolType.GRPC,
            requestName: RequestName.GET,
            sourceWriter: call,
            sourceReader: undefined
        }, call.request);
    }

    setHandler: DataRequestsHandlers["Set"] = (call, callback) => {
        call.on("data", info => {
            if (info.infoOrData === "info") {
                this.requestManager?.register({
                    protocol: ProtocolType.GRPC,
                    requestName: RequestName.SET,
                    sourceWriter: callback,
                    sourceReader: call
                }, info);
            } else throw Error("NOT INFO ERROR");
        })
    }
}

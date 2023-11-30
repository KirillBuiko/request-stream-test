import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from "@grpc-build/build/data_requests";
import {serviceImplementations} from "./serviceImplementations";
import {grpcLoadOptions} from "../grpcLoadOptions";

const packageDefinition = protoLoader.loadSync('./grpc/data_requests.proto', grpcLoadOptions);
const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
const server = new grpc.Server();

server.addService(proto.DataRequests.service, serviceImplementations);
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log("GRPC server started");
    server.start();
});
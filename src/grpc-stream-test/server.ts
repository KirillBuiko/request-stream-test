import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from "@grpc-build/build/data_requests";
import { DataRequestsHandlers } from '@grpc-build/build/DataRequests';


const packageDefinition = protoLoader.loadSync('./grpc/data_requests.proto');
const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
const server = new grpc.Server();

interface RequestInfo {
    type: string,
    variableInfo?: {
        variableId: string
    }
}

interface GetResponse {
    chunk_data: Buffer;
}

interface SetRequest {
    chunk_data: Buffer;
}

type MessageEvents = {
    error: (error: Error) => void,
    message: (body: string, from: string) => void
}

const dataRequestServiceImplementationsType: DataRequestsHandlers = {
    Get: call => {

    },
    Set: (call, callback) => {

    }
}

server.addService(proto.DataRequests.service, dataRequestServiceImplementationsType);
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log("GRPC server started");
    server.start();
});
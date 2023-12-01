import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from "@grpc-build/build/data_requests";
import {DataStream__Output} from "@grpc-build/build/DataStream";
import {grpcLoadOptions} from "@grpc-build/grpcLoadOptions";
import * as fs from "fs";

const packageDefinition = protoLoader.loadSync('./grpc/data_requests.proto', grpcLoadOptions);
const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

const client = new proto.DataRequests('localhost:50051', grpc.credentials.createInsecure());

const file = fs.createWriteStream("./text/text-get.txt");

const call = client.get({requestType: "VARIABLE", variableGetInfo: {variableId: "123123"}});

call.on("data", (data: DataStream__Output) => {
    if (data.info) {
        console.log(data.info.requestType == "VARIABLE");
        console.log(data.info);
    } else if (data.chunkData) {
        file.write(data.chunkData);
    }
})

call.on("error", (error) => {
    console.log(error)
})

call.on("close", () => {
    console.log("CLOSED");
    file.end();
})

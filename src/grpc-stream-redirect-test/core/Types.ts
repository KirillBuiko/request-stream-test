import {sendUnaryData, ServerReadableStream, ServerWritableStream} from "@grpc/grpc-js";
import {BusboyFileStream} from "@fastify/busboy";
import {Stream} from "stream";
import {DataRequestsHandlers} from "@grpc-build/build/DataRequests";

export enum StreamType {
    GRPC = 0,
    REST_API = 1
}

export interface ReaderWriterType<RequestType,ResponseType> {
    [StreamType.GRPC]: {
        Get: {
            Source: [void, ServerWritableStream<RequestType, ResponseType>];
            Dest: [ServerReadableStream<RequestType, ResponseType>, void];
        };
        Set: {
            Source: [ServerReadableStream<RequestType, ResponseType>, sendUnaryData<ResponseType>] ;
            Dest: [Promise<ResponseType>, ServerWritableStream<RequestType, ResponseType>];
        };
    };
    [StreamType.REST_API]: {
        Get: [void, BusboyFileStream];
        Set: [BusboyFileStream, sendUnaryData<ResponseType>];
    }
}

export type RequestName = "Get" | "Set";

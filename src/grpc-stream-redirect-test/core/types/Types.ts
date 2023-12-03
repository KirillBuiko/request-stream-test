import {BusboyFileStream} from "@fastify/busboy";
import {DataRequestsClient, DataRequestsHandlers} from "@grpc-build/build/DataRequests";

export enum ProtocolType {
    GRPC = 0,
    REST_API = 1
}

export enum RequestName {
    GET = 10,
    SET
}

export enum RequestDirection {
    FROM = 20,
    TO
}

export enum StreamType {
    READER = 30,
    WRITER
}

interface SourceReaderWriterOptions<
    ProtocolT extends ProtocolType, RequestN extends RequestName,
    SourceReaderT, SourceWriterT> {
    protocol: ProtocolT;
    requestName: RequestN;
    sourceReader?: SourceReaderT;
    sourceWriter?: SourceWriterT;
}

interface DestinationReaderWriterOptions<
    ProtocolT extends ProtocolType, RequestN extends RequestName,
    DestReaderT, DestWriterT> {
    protocol: ProtocolT,
    requestName: RequestN,
    destReader?: DestReaderT;
    destWriter?: DestWriterT;
}

export type SourceOptionsType =
    | SourceReaderWriterOptions<ProtocolType.GRPC, RequestName.GET,
    void, Parameters<DataRequestsHandlers["Get"]>[0]>

    | SourceReaderWriterOptions<ProtocolType.REST_API, RequestName.GET,
    void, BusboyFileStream>

    | SourceReaderWriterOptions<ProtocolType.GRPC, RequestName.SET,
    Parameters<DataRequestsHandlers["Set"]>[0], Parameters<DataRequestsHandlers["Set"]>[1]>

    | SourceReaderWriterOptions<ProtocolType.REST_API, RequestName.SET,
    BusboyFileStream, Parameters<DataRequestsHandlers["Set"]>[1]>

export type DestinationOptionsType =
    | DestinationReaderWriterOptions<ProtocolType.GRPC, RequestName.GET,
    ReturnType<DataRequestsClient["Get"]>, void>

    | DestinationReaderWriterOptions<ProtocolType.GRPC, RequestName.SET,
    Promise<NonNullable<Parameters<Parameters<DataRequestsClient["Set"]>[0]>[1]>>, ReturnType<DataRequestsClient["Set"]>>

export type NarrowedOptionsType<
    ProtocolT extends ProtocolType, RequestN extends RequestName, OptionsT> =
    OptionsT extends {protocol: ProtocolT, requestName: RequestN}
        ? OptionsT : never;

export type NarrowedSourceOptionsType<
    ProtocolT extends ProtocolType, RequestN extends RequestName> =
    NarrowedOptionsType<ProtocolT, RequestN, SourceOptionsType>

export type NarrowedDestinationOptionsType<
    ProtocolT extends ProtocolType, RequestN extends RequestName> =
    NarrowedOptionsType<ProtocolT, RequestN, DestinationOptionsType>

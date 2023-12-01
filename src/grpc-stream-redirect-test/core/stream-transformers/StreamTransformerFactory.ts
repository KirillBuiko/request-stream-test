import {
    ReaderWriterType,
    RequestName,
    StreamType,
} from "@src/grpc-stream-redirect-test/core/Types";

export type GetTransformerOptions<
    RequestT extends RequestName,
    SourceT extends StreamType,
    DestT extends StreamType,
    SourceRequestT,
    SourceResponseT> = {
    rpcType: RequestT,
    sourceType: SourceT,
    destType: DestT,
    sourceReader?: ReaderWriterType<SourceRequestT, SourceResponseT>[SourceT][RequestT][0],
    sourceWriter?: ReaderWriterType<SourceRequestT, SourceResponseT>[SourceT][RequestT][1],
    destReader?: ReaderWriterType<SourceResponseT, SourceRequestT>[DestT][RequestT][0],
    destWriter?: ReaderWriterType<SourceResponseT, SourceRequestT>[DestT][RequestT][1],
}

export class StreamTransformerFactory {
    generateTransformer<ST extends StreamType, DT extends StreamType>(options: GetTransformerOptions<ST, DT>) {

    }
}

(new StreamTransformerFactory()).generateTransformer({
    requestType: RequestName;
    destType: StreamType.GRPC,
    sourceType: StreamType.REST_API,
    sourceWriter:
});

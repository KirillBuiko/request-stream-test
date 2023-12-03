import {
    DestinationOptionsType,
    ProtocolType, SourceOptionsType
} from "@src/grpc-stream-redirect-test/core/types/Types";

export class PipelineBuilderClass {
    buildPipeline<SourceRequestT, SourceResponseT>
    (sourceOptions: SourceOptionsType<SourceRequestT, SourceResponseT>,
     destOptions: DestinationOptionsType<SourceResponseT, SourceRequestT>) {
        if (destOptions.protocol === ProtocolType.GRPC) {

        }
    }
}

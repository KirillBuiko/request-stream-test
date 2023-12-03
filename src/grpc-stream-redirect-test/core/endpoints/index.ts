import {EndpointName} from "@src/grpc-stream-redirect-test/core/app/types/EndpointConfigType";
import {IEndpoint} from "@src/grpc-stream-redirect-test/core/app/types/IEndpoint";
import {GrpcEndpoint} from "@src/grpc-stream-redirect-test/core/endpoints/GrpcEndpoint";

export const endpoints: {[endpoint in EndpointName]: IEndpoint} = {
    computationModelsStorage: new GrpcEndpoint(),
    executor: new GrpcEndpoint(),
    generator: new GrpcEndpoint(),
    interpreter: new GrpcEndpoint(),
    modulesStorage: new GrpcEndpoint(),
    planner: new GrpcEndpoint(),
    programsStorage: new GrpcEndpoint(),
    tasksStorage: new GrpcEndpoint(),
    variablesStorage: new GrpcEndpoint()
}
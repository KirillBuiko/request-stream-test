import {RequestName} from "@src/grpc-stream-redirect-test/core/types/Types";
import {RequestType__Output} from "@grpc-build/build/RequestType";
import {EndpointName} from "@src/grpc-stream-redirect-test/core/app/types/EndpointConfigType";

const routes: {[requestType in RequestType__Output]: {[requestName in RequestName]: EndpointName | null}} = {
    "VARIABLE": {
        [RequestName.GET]: "variablesStorage",
        [RequestName.SET]: "variablesStorage"
    },
    "VARIABLE_LIST": {
        [RequestName.GET]: "variablesStorage",
        [RequestName.SET]: null
    },
    "PROGRAM": {
        [RequestName.GET]: "programsStorage",
        [RequestName.SET]: "programsStorage"
    },
    "PROGRAM_EXECUTE": {
        [RequestName.GET]: "executor",
        [RequestName.SET]: null
    },
    "PROGRAM_GENERATE": {
        [RequestName.GET]: "generator",
        [RequestName.SET]: null
    },
    "PROGRAM_INTERPRET": {
        [RequestName.GET]: "interpreter",
        [RequestName.SET]: null
    },
    "COMPUTATIONAL_MODEL": {
        [RequestName.GET]: "computationModelsStorage",
        [RequestName.SET]: "computationModelsStorage"
    },
    "COMPUTATIONAL_MODEL_LIST": {
        [RequestName.GET]: "computationModelsStorage",
        [RequestName.SET]: null
    },
    "TASK": {
        [RequestName.GET]: "tasksStorage",
        [RequestName.SET]: "tasksStorage"
    },
    "TASK_LIST": {
        [RequestName.GET]: "tasksStorage",
        [RequestName.SET]: null
    },
    "TASK_PLAN": {
        [RequestName.GET]: "planner",
        [RequestName.SET]: null
    },
}

export class RequestRouter {
    getEndpointName(requestType: RequestType__Output, requestName: RequestName): EndpointName | null {
        return routes[requestType][requestName];
    }
}
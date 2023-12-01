import {DataRequestsHandlers} from "@grpc-build/build/DataRequests";
import {defaultGetHandler} from "./get-handlers/defaultGetHandler";

export const serviceImplementations: DataRequestsHandlers =  {
    Get(call): void {
        defaultGetHandler(call);
    },

    Set(): void {
    }
}
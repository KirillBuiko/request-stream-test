import {DataRequestsHandlers} from "@grpc-build/build/DataRequests";
import * as fs from "fs";

export const defaultGetHandler: DataRequestsHandlers["Get"] =
    (call) => {
        console.log("START");
        call.write({info: {requestType: "VARIABLE", variableDataInfo: {variableName: "variable1", dataType: "TEXT"}}});
        const file = fs.createReadStream("./text/text-send.txt");
        file.on("data", (data) => call.write({chunkData: data}));
        file.on("error", () => call.emit("error"));
        file.on("end", () => call.end());
    }
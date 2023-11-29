import {Readable, Writable} from "node:stream";

export function getReaderWriter(): [Readable, Writable] {
    const reader = new Readable({
        read() {}
    });
    const writer = new Writable({
        write(chunk, encoding, callback) {
            reader.push(chunk);
            callback();
        },
    });
    reader.on("data", (chunk: Buffer) => {
        console.log(chunk.toString());
    });
    reader.on("end", () => {
        console.log("END");
    });
    writer.on('close', () => {
        reader.push(null);
    });
    return [reader, writer];
}
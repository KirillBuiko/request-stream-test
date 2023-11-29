import * as fs from 'fs';

const host = "http://localhost:3000";
const requestInfo = {
    type: "variable",
    info: {
        variableID: 10012
    }
}

async function sendFile(requestInfo: any, filePath: string) {
    const form = new FormData();
    form.append("info", JSON.stringify(requestInfo));
    form.append("data", await fs.openAsBlob(filePath));

    await fetch(`${host}/set`, {
        method: "POST",
        body: form,
        // @ts-ignore
        duplex: "half"
    })
}

async function getFile(requestInfo: any) {
    fetch(`${host}/get?info=${JSON.stringify(requestInfo)}`, {
        method: "GET"
    }).then(res => res.arrayBuffer())
        .then((buffer) => {
            console.log(buffer.toString());
            fs.createWriteStream("./test2.txt").write(buffer);
        })
}

async function main() {
    await sendFile(requestInfo, "./test.txt");
    await getFile(requestInfo);
}

main();

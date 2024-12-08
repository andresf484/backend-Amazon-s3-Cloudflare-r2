import {
    getFiles,
    uploadFile,
    getFile,
    downloadFile,
    getFileURL,
    deleteFile,
} from '../services/cloudflareR2Service.js';

export async function listarArchivos(req, res) {

    const result = await getFiles();

    return res.status(200).json({
        //status: true,
        //message: 'welcome to server with s3'
        Contents: result.Contents,
    });
}

export async function subirArchivo(req, res) {
    
    //console.log(req.body);
    //console.log(req.files);

    const { folder_name } = req.body;

    const result = await uploadFile(folder_name, req.files.file);

    return res.status(200).json({
        //status: true,
        //message: 'uploaded file successfull'
        result
    });

}

export async function infoArchivo(req, res) {
    //console.log(req.params.fileName);

    const { fileName } = req.body;

    //Validar que el archivo existe
    const result = await getFile(fileName);
    //console.log(result);


    // 200 - Existe el archivo
    if (result.$metadata.httpStatusCode === 200) {
        return res.status(200).json(result.$metadata);
    } else if (result.$metadata.httpStatusCode === 404) { // 404 - No existe el archivo
        return res.status(404).json({});
    } else {
        return res.status(500).json({});
    }

}

export async function obtenerArchivoDirectamente(req, res) {
    //console.log(req.params.fileName);

    const { fileName } = req.params;

    //Validar que el archivo existe
    const result = await getFile(fileName);
    //console.log(result.$metadata);


    // 200 - Existe el archivo
    if (result.$metadata.httpStatusCode === 200) {
        //https://stackoverflow.com/questions/70028630/how-to-pipe-a-s3-getsignedurl
        //generate readStream from the result and pipe it to the response
        return await result.Body.pipe(res);

        //return res.status(200).json(result.$metadata);
    } else if (result.$metadata.httpStatusCode === 404) { // 404 - No existe el archivo
        return res.status(404).json({});
    } else {
        return res.status(500).json({});
    }

}

export async function descargarArchivo(req, res) {
    //console.log(req.params.fileName);

    const { fileName } = req.body;

    const result = await downloadFile(fileName);

    return res.status(200).json({
        message: 'Descarga exitosa',
    });

    //return res.status(200).json(result.$metadata);

}

export async function eliminarArchivo(req, res) {
    //console.log(req.params.fileName);

    const { fileName } = req.body;

    const result = await deleteFile(fileName);
    //console.log(result);

    return res.status(200).json(result.$metadata);

}
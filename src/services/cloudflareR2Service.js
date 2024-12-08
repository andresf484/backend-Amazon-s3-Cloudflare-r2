import { 
    S3Client, 
    PutObjectCommand,
    ListObjectsCommand,
    //ListObjectsV2Command,
    GetObjectCommand,
    DeleteObjectCommand
} from '@aws-sdk/client-s3';

import { 
    getSignedUrl 
} from '@aws-sdk/s3-request-presigner';

import fs from 'fs';

import { CLOUDFLARE_R2 } from '../config/configuration.js';

// https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/#generate-presigned-urls
const client = new S3Client({
    region: 'auto',
    endpoint: `https://${CLOUDFLARE_R2.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: CLOUDFLARE_R2.CLOUDFLARE_R2_PUBLIC_ACCESS_KEY,
        secretAccessKey: CLOUDFLARE_R2.CLOUDFLARE_R2_SECRET_ACCESS_KEY
    }
});


export async function uploadFile(folder_name, file) {

    try {

        let key_string = '';
        if (folder_name !== '' && folder_name !== undefined && folder_name !== null) {
            key_string = `${folder_name}/${file.name}`;
        } else {
            key_string = `${file.name}`;
        }

        //const stream = fs.createReadStream(file.tempFilePath);
        const stream = file.data;

        const uploadParams = {
            Bucket: CLOUDFLARE_R2.CLOUDFLARE_R2_BUCKET_NAME,
            Key: key_string,
            //Key: file.name,
            Body: stream
        };

        const command = new PutObjectCommand(uploadParams);
        const result = await client.send(command);

        //console.log(result);
        return result;

    } catch (err) {
        console.log('Error', err);
        return err;
    }

}

export async function getFiles() {

    try {

        const params = {
            Bucket: CLOUDFLARE_R2.CLOUDFLARE_R2_BUCKET_NAME
        };

        const command = new ListObjectsCommand(params);

        const result = await client.send(command);

        //console.log(result);
        return result;

    } catch (err) {
        console.log('Error', err);
        return err;
    }

}

export async function getFile(fileName) {

    try {

        const params = {
            Bucket: CLOUDFLARE_R2.CLOUDFLARE_R2_BUCKET_NAME,
            Key: fileName
        };

        const command = new GetObjectCommand(params);

        const result = await client.send(command);

        //console.log(result);
        return result;

    } catch (err) {
        console.log('Error', err);
        return err;
    }

}

export async function downloadFile(fileName) {

    try {

        const params = {
            Bucket: CLOUDFLARE_R2.CLOUDFLARE_R2_BUCKET_NAME,
            Key: fileName
        };

        const command = new GetObjectCommand(params);

        const result = await client.send(command);
        //console.log(result);

        //Colocar el archivo en la carpeta publica
        result.Body.pipe(fs.createWriteStream('./public/' + fileName));

    } catch (err) {
        console.log('Error', err);
        return err;
    }

}

// https://developers.cloudflare.com/r2/api/s3/presigned-urls/
// https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/#generate-presigned-urls
export async function getFileURL(fileName) {

    try {

        const params = {
            Bucket: CLOUDFLARE_R2.CLOUDFLARE_R2_BUCKET_NAME,
            Key: fileName
        };

        const command = new GetObjectCommand(params);

        const result = await getSignedUrl(client, command, { expiresIn: 3600 });

        //console.log(result);
        return result;

    } catch (err) {
        console.log('Error', err);
        return err;
    }

}

export async function deleteFile(fileName) {

    try {

        const params = {
            Bucket: CLOUDFLARE_R2.CLOUDFLARE_R2_BUCKET_NAME,
            Key: fileName
        };

        const command = new DeleteObjectCommand(params);

        const result = await client.send(command);

        //console.log(result);
        return result;

    } catch (err) {
        console.log('Error', err);
        return err;
    }

}
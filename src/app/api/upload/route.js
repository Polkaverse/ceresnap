import { DdcClient, File, MAINNET, JsonSigner } from '@cere-ddc-sdk/ddc-client';
import * as fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    // Parse form data to retrieve the uploaded file
    const formData = await req.formData();
    const uploadedFile = formData.get('file');

    if (!uploadedFile) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Path to the account key for authentication
    const pathToAccount = path.join(process.cwd(), 'src/app/api/upload/6S5nrcLgUrhC2tLpaG83VLrMndnQ66DPTz7j6PoRnQjZKpvx.json');
    const accountPassphrase = '1234';

    // Bucket ID for file storage on the DDC network
    const bucketId = BigInt(1095);

    // Setup JsonSigner and DDC Client
    const keyringPair = JSON.parse(fs.readFileSync(pathToAccount).toString());
    const jsonSigner = new JsonSigner(keyringPair, { passphrase: accountPassphrase });
    const client = await DdcClient.create(jsonSigner, MAINNET);

    // Prepare the file as a readable stream for uploading
    const fileToUpload = new File(uploadedFile.stream(), { size: uploadedFile.size });
    const uploadedFileUri = await client.store(bucketId, fileToUpload);

    console.log(
      'The file can be accessed by this URL:',
      `https://storage.dragon.cere.network/${bucketId}/${uploadedFileUri.cid}`
    );

    await client.disconnect();

    return new Response(
      JSON.stringify({ url: `https://storage.dragon.cere.network/${bucketId}/${uploadedFileUri.cid}` }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error uploading file:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

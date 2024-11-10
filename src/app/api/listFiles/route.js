import { DdcClient, MAINNET, JsonSigner } from '@cere-ddc-sdk/ddc-client';
import { NextResponse } from 'next/server';

/**
 * Your Cere wallet credentials and passphrase
 */
const userMnemonic = 'hybrid label reunion only dawn maze asset draft cousin height flock nation';
const accountPassphrase = '1234';

/**
 * The DDC bucket ID where files are stored
 */
const bucketId = BigInt(1095); // Example bucket ID from your setup

export async function GET() {
  try {
    // Initialize the DDC client with mainnet configuration
    const jsonSigner = new JsonSigner(userMnemonic, { passphrase: accountPassphrase });
    const client = await DdcClient.create(jsonSigner, MAINNET);

    // Get all files in the specified bucket
    const files = await client.listFiles(bucketId);

    // Disconnect the DDC client
    await client.disconnect();

    // Format URLs for each file in the bucket
    const fileUrls = files.map(file => ({
      cid: file.cid,
      url: `https://storage.dragon.cere.network/${bucketId}/${file.cid}`,
    }));

    return new NextResponse(JSON.stringify({ files: fileUrls }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error listing files:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

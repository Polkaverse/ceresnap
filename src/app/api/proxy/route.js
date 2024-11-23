import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const response = await fetch(url);
        const buffer = await response.buffer();
        const contentType = response.headers.get('content-type');
        return new NextResponse(buffer, {
            headers: { 'Content-Type': contentType },
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}
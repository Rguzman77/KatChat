import type { APIRoute } from "astro";
import { TextDocument } from './db';

import {
  v2 as cloudinary, type UploadApiResponse,
} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadStream = async (buffer: Uint8Array, options: {
  folder: string,
  ocr?: string,
}): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary
      .uploader
      .upload_stream(options, (error, result) => {
        if (result) return resolve(result);
        reject(error);      
      }).end(buffer)
    })
}

export const POST: APIRoute = async ({ request }) => {
  let formData;
  try {
    formData = await request.formData();
  } catch (error) {
    console.error('Error on obtaining FormData:', error);
    return new Response(JSON.stringify({ error: 'Error on obtaining FormData' }), { status: 500 });
  }

  const file = formData.get('file') as File;

  if (file == null) {
    return new Response("No file found", { status: 400 });
  }

  let arrayBuffer;
  try {
    arrayBuffer = await file.arrayBuffer();
  } catch (error) {
    console.error('Error on obtaining the buffer file:', error);
    return new Response(JSON.stringify({ error: 'Error on obtaining the buffer file' }), { status: 500 });
  }

  const unit8Array = new Uint8Array(arrayBuffer);

  let result;
  try {
    result = await uploadStream(unit8Array, {
      folder: 'pdf',
      ocr: 'adv_ocr'
    })
  } catch (error) {
    console.error('Error on uploading to Cloudinary:', error);
    return new Response(JSON.stringify({ error: 'Error on uploading to Cloudinary' }), { status: 500 });
  }

  const {
    asset_id: id,
    secure_url: url,
    pages,
    info
  } = result

  const data = info?.ocr?.adv_ocr?.data

  const text = data.map((blocks: { textAnnotations: { description: string }[] }) => {
    const annotations = blocks['textAnnotations'] ?? {}
    const first = annotations[0] ?? {}
    const content = first['description'] ?? ''
    return content.trim()
  }).filter(Boolean).join('\n')

  const textDoc = new TextDocument({ _id: id, text: text });
  try {
    await textDoc.save();
    console.log('Text saved to MongoDB');
  } catch (err) {
    console.error('Error on saving text to MongoDB', err);
    return new Response(JSON.stringify({ error: 'Error on saving text to MongoDB' }), { status: 500 });
  }

  return new Response(JSON.stringify({
    id,
    url,
    pages
  }));
}
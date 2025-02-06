import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export async function POST(request: Request) {
  try {
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    // Validate file
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF file.' },
        { status: 400 }
      );
    }

    // Debug log
    console.log('Processing file:', file.name, file.type, file.size);

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse PDF
    try {
      const data = await pdf(buffer);

      // Validate parsed text
      if (!data.text || data.text.trim().length === 0) {
        return NextResponse.json(
          { error: 'No text content found in PDF' },
          { status: 422 }
        );
      }

      // Debug log
      console.log('PDF parsed successfully, length:', data.text.length);

      // Return success response
      return NextResponse.json({ text: data.text }, { status: 200 });
    } catch (pdfError: any) {
      console.error('PDF parsing error:', pdfError);
      return NextResponse.json(
        { error: `PDF parsing failed: ${pdfError.message}` },
        { status: 422 }
      );
    }
  } catch (error: any) {
    console.error('Request handling error:', error);
    return NextResponse.json(
      { error: 'Failed to process request: ' + error.message },
      { status: 500 }
    );
  }
}
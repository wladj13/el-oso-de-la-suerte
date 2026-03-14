import { renderToBuffer } from '@react-pdf/renderer';
import { createElement } from 'react';
import ManualPDF from '@/lib/pdf/ManualPDF';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const buffer = await renderToBuffer(createElement(ManualPDF));
    const uint8Array = new Uint8Array(buffer);
    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Manual-El-Oso-de-la-Suerte-v1.0.pdf"',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generando PDF:', error);
    return new NextResponse('Error generando el PDF', { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceType, deviceType, message } = body;

    if (!name || !email || !phone || !serviceType) {
      return NextResponse.json(
        { success: false, error: 'Name, email, phone, and service type are required.' },
        { status: 400 }
      );
    }

    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        serviceType,
        deviceType: deviceType || 'Not specified',
        message: message || '',
        status: 'pending',
      },
    });

    return NextResponse.json(
      { success: true, data: submission },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit your request. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ success: true, data: submissions });
  } catch (error) {
    console.error('Fetch submissions error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions.' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { sendBookingEmail, BookingFormData } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const {
      name,
      email,
      telegram,
      projectName,
      projectDescription,
      budget,
      packageName,
      packagePrice,
    } = body as BookingFormData;

    if (!name || !email || !projectName || !projectDescription || !packageName || !packagePrice) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: name, email, projectName, projectDescription, packageName, and packagePrice are required',
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send email
    await sendBookingEmail({
      name,
      email,
      telegram,
      projectName,
      projectDescription,
      budget,
      packageName,
      packagePrice,
    });

    return NextResponse.json(
      { success: true, message: 'Booking request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking form error:', error);
    return NextResponse.json(
      { error: 'Failed to send booking request. Please try again later.' },
      { status: 500 }
    );
  }
}

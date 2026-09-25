import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { leadId, fullName, workEmail, companyName, selectedDate, selectedTime, timeZone } = body;

    if (!selectedDate || !selectedTime) {
      return NextResponse.json({ success: false, error: 'Please select a date and time slot.' }, { status: 400 });
    }

    const bookingId = `BOOK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const startDateTime = new Date(`${selectedDate}T${selectedTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000); // 30 min meeting

    // Generate Google Calendar Link
    const gCalTitle = encodeURIComponent(`KlearStack AI Demo: ${companyName || 'Lead'} x Hexanovate`);
    const gCalDetails = encodeURIComponent(`Product Deep Dive & Custom Architecture Session for ${fullName || 'Guest'}.`);
    const gCalLocation = encodeURIComponent('Google Meet (Link will be sent via email)');

    const isoStart = startDateTime.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const isoEnd = endDateTime.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=${isoStart}/${isoEnd}&details=${gCalDetails}&location=${gCalLocation}`;

    const confirmationDetails = {
      bookingId,
      leadId,
      fullName,
      workEmail,
      companyName,
      dateTimeFormatted: `${selectedDate} at ${selectedTime} (${timeZone || 'IST'})`,
      googleCalendarUrl,
      meetUrl: 'https://meet.google.com/hex-ai-demo',
      status: 'CONFIRMED',
    };

    console.log('[Calendar Booking Confirmed]', confirmationDetails);

    return NextResponse.json({
      success: true,
      message: 'Demo slot booked successfully!',
      booking: confirmationDetails,
    });
  } catch (err: any) {
    console.error('[Booking API Error]', err);
    return NextResponse.json({ success: false, error: 'Failed to process booking slot.' }, { status: 500 });
  }
}

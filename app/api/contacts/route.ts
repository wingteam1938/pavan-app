import { connectDB } from '@/lib/db'
import Contact from '@/lib/models/Contact'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    const contact = await Contact.create(body)
    return NextResponse.json({ success: true, contact }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find().sort({ createdAt: -1 })
    return NextResponse.json(contacts)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

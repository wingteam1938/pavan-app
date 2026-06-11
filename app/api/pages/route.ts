import { connectDB } from '@/lib/db'
import Page from '@/lib/models/Page'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    const pages = await Page.find({ is_active: true })
    
    const result: { [key: string]: any } = {}
    pages.forEach((page: any) => {
      try {
        result[page.page_key] = JSON.parse(page.content)
      } catch {
        result[page.page_key] = page.content
      }
    })
    
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    
    for (const [pageKey, data] of Object.entries(body)) {
      const content = typeof data === 'object' ? JSON.stringify(data) : data
      await Page.findOneAndUpdate(
        { page_key: pageKey },
        { content },
        { upsert: true }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update pages' }, { status: 500 })
  }
}

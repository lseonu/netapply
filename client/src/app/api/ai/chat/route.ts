import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { mode, content, jobUrl, jobDescription, resume, messages } = await request.json();

    let systemPrompt = '';
    switch (mode) {
      case 'resume':
        systemPrompt = `You are an expert resume reviewer and career coach. Analyze the resume against the job description and provide specific, actionable feedback for improvement. Focus on:
1. Keyword matching
2. Skills alignment
3. Experience relevance
4. Format and presentation
5. Specific suggestions for improvement`;
        break;
      case 'cover-letter':
        systemPrompt = `You are a professional cover letter writer. Create a compelling cover letter that:
1. Matches the job requirements
2. Highlights relevant experience
3. Shows enthusiasm for the role
4. Maintains a professional tone
5. Is concise and impactful`;
        break;
      default:
        systemPrompt = `You are a helpful career assistant. Provide clear, actionable advice for job seekers.`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        { role: "user", content: content || `Analyze this resume for the job:\n\nJob Description: ${jobDescription}\n\nResume: ${resume}` }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return NextResponse.json({ 
      response: completion.choices[0].message.content,
      status: 200 
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during the request' },
      { status: 500 }
    );
  }
} 
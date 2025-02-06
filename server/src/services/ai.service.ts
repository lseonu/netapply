import OpenAI from 'openai';

export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async tailorResume(resume: string, jobDescription: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert resume tailoring assistant."
          },
          {
            role: "user",
            content: `Please tailor this resume for the following job description. 
            Highlight relevant skills and experience, and suggest modifications.
            Resume: ${resume}
            Job Description: ${jobDescription}`
          }
        ],
        temperature: 0.7,
      });

      return response.choices[0].message?.content;
    } catch (error) {
      console.error('Error tailoring resume:', error);
      throw error;
    }
  }

  async generateNetworkingMessage(
    userProfile: any,
    targetContact: any,
    companyName: string
  ) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert networking message writer."
          },
          {
            role: "user",
            content: `Generate a personalized networking message for a LinkedIn connection request.
            My Profile: ${JSON.stringify(userProfile)}
            Target Contact: ${JSON.stringify(targetContact)}
            Company: ${companyName}`
          }
        ],
        temperature: 0.7,
      });

      return response.choices[0].message?.content;
    } catch (error) {
      console.error('Error generating networking message:', error);
      throw error;
    }
  }
} 
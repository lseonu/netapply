import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export class GmailService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  async syncJobEmails(userId: string, accessToken: string) {
    try {
      this.oauth2Client.setCredentials({ access_token: accessToken });
      const gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });

      // Search for job-related emails
      const response = await gmail.users.messages.list({
        userId: 'me',
        q: 'subject:(application OR interview OR offer) from:(jobs OR careers OR talent)',
      });

      const messages = response.data.messages || [];
      const processedEmails = await Promise.all(
        messages.map(async (message) => {
          const email = await gmail.users.messages.get({
            userId: 'me',
            id: message.id!,
          });
          return this.processJobEmail(email.data);
        })
      );

      return processedEmails;
    } catch (error) {
      console.error('Error syncing Gmail:', error);
      throw error;
    }
  }

  private processJobEmail(email: any) {
    // Extract relevant information from email
    const headers = email.payload.headers;
    const subject = headers.find((h: any) => h.name === 'Subject').value;
    const from = headers.find((h: any) => h.name === 'From').value;
    
    // Determine email type and status
    const status = this.determineApplicationStatus(subject, email.snippet);
    
    return {
      emailId: email.id,
      subject,
      from,
      status,
      date: email.internalDate,
      snippet: email.snippet,
    };
  }

  private determineApplicationStatus(subject: string, content: string): string {
    const subject_lower = subject.toLowerCase();
    const content_lower = content.toLowerCase();
    
    if (subject_lower.includes('offer') || content_lower.includes('offer letter')) {
      return 'OFFER';
    } else if (subject_lower.includes('interview')) {
      return 'INTERVIEWING';
    } else if (subject_lower.includes('received') || subject_lower.includes('confirmation')) {
      return 'APPLIED';
    } else if (subject_lower.includes('not moving forward') || subject_lower.includes('unfortunately')) {
      return 'REJECTED';
    }
    return 'UNKNOWN';
  }
} 
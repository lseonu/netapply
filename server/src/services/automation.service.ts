import { Browser, chromium } from 'playwright';

export class AutomationService {
  private browser: Browser | null = null;

  async initialize() {
    this.browser = await chromium.launch({ headless: true });
  }

  async autoApplyWorkday(jobUrl: string, applicationData: any) {
    try {
      if (!this.browser) await this.initialize();
      const context = await this.browser!.newContext();
      const page = await context.newPage();

      await page.goto(jobUrl);

      // Fill out Workday application
      await page.click('text=Apply');
      await page.fill('input[name="firstName"]', applicationData.firstName);
      await page.fill('input[name="lastName"]', applicationData.lastName);
      await page.fill('input[name="email"]', applicationData.email);

      // Upload resume if provided
      if (applicationData.resumePath) {
        await page.setInputFiles('input[type="file"]', applicationData.resumePath);
      }

      // Submit application
      await page.click('button[type="submit"]');
      
      // Wait for confirmation
      await page.waitForSelector('text=Thank you for your application');

      await context.close();
      return true;
    } catch (error) {
      console.error('Error auto-applying:', error);
      throw error;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
} 
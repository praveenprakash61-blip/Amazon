export class SearchPage {
  constructor(page) {
    this.page = page;
  }

  async selectFirstProduct(context) {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.page.locator('a:has-text("JBL")').first().click()
    ]);
    return newPage;
  }
}
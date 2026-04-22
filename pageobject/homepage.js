export class HomePage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.getByPlaceholder('Search Amazon.in');
    this.searchBtn = page.locator('#nav-search-submit-button');
  }

  async searchProduct(product) {
    await this.searchBox.fill(product);
    await this.searchBtn.click();
  }
}
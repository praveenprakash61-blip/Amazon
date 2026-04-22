export class ProductPage {
  constructor(page) {
    this.page = page;
    this.buyNow = page.getByRole('button', { name: /Buy Now/i });
    this.addToCart = page.getByRole('button', { name: /Add to Cart/i });
  }

  async purchaseFlow() {
    if (await this.buyNow.isVisible()) {
      await this.buyNow.click();
    } else {
      await this.addToCart.click();
    }
  }
}
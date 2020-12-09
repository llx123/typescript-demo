import superagent from 'superagent';

class Crawler {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html/secret=${this.secret}`;
  private html = '';
  constructor() {
    this.getHtml()
  }
  async getHtml() {
    const result = await superagent.get(this.url);
    console.log(result.text);

  }
}

const crawler = new Crawler()
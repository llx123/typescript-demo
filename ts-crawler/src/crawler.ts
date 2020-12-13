import superagent from 'superagent';
import cheerio from 'cheerio';

interface Info {
  title: string
}

class Crawler {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html/secret=${this.secret}`;
  private html = '';
  constructor() {
    this.getHtml()
  }
  getInfo(result: string) {
    const $ = cheerio.load(result);
    const items = $('.course-item');
    const infoList: Info[] = [];
    items.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      infoList.push({
        title
      })
    })
  }
  async getHtml() {
    const result = await superagent.get(this.url);
    this.getInfo(result.text);
  }
}

const crawler = new Crawler()
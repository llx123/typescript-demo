import fs from 'fs';
import path from 'path';

import superagent from 'superagent';
import cheerio from 'cheerio';

interface Course {
  title: string
}

interface CourseResult {
  time: number,
  data: Course[]
}

interface Content {
  [propName: number]: Course[]
}

class Crawler {
  private secret = 'secretKey';
  private url = `http://www.dell-lee.com/typescript/demo.html/secret=${this.secret}`;
  private html = '';
  private filePath = '';
  constructor() {
    this.initProcess();
    this.filePath = path.resolve(__dirname, '../data/course.json');
  }
  getInfo(result: string) {
    const $ = cheerio.load(result);
    const items = $('.course-item');
    const infoList: Course[] = [];
    items.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      infoList.push({
        title
      })
    });
    return {
      time: +new Date(),
      data: infoList
    }
  }
  getHtml() {
    return superagent.get(this.url);
  }
  generateJsonContent(courseInfo: CourseResult) {    
    let fileCount: Content = {};
    if (fs.existsSync(this.filePath)) {
      fileCount = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    }
    fileCount[courseInfo.time] = courseInfo.data;
    return fileCount;
  }
  async initProcess() {
    const result = await this.getHtml();
    const courseResult = this.getInfo(result.text);

    let fileCount = this.generateJsonContent(courseResult);
    fs.writeFileSync(this.filePath, JSON.stringify(fileCount));

  }
}

const crawler = new Crawler()
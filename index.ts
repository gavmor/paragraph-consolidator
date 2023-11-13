import * as cheerio from 'cheerio';
import * as fs from 'fs';

function consolidateParagraphs($: cheerio.Root): cheerio.Root {
  $('p').toArray().reduce((prevP, currentP) => {
    const text = $(currentP).text().trim();

    if (prevP && !/[\。”？！]$/.test($(prevP).text())) {
      $(prevP).append(text);
      $(currentP).remove();
    } else {
      prevP = currentP;
    }

    return prevP;
  }, null);
  
  return $;
}

function nixExtraNewlines(html: string): string {
  return html.replace(/<\/p>\s*<p>/g, '</p>\n<p>');
}

fs.writeFileSync('ch3.html', nixExtraNewlines(consolidateParagraphs(cheerio.load(fs.readFileSync('ch3.html', 'utf-8'))).html()));
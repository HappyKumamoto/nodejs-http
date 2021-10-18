'use strict';
const http = require('http');
const pug = require('pug');
const server = http
  .createServer((req, res) => {
　　　　console.info('Requested by ' + req.connection.remoteAddress);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });

    switch (req.method) {
      case 'GET':
        if (req.url === '/applicationForm/tasty-red') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: 'とまと',
              secondItem: 'すいか',
              thirdItem: 'いちご',
              fourthItem: '赤牛',
              fifthItem: '天草大王(赤鶏)',
              sixthItem: '車海老',
              seventhItem: '阿蘇山',
              eighthItem: '天草',
              ninethItem: '熊本城',
              tenthItem: '菊池渓谷',
              eleventhItem: '大歓峰',
              twelvthItem: '白川水源'
            })
          );
        } else if (req.url === '/applicationForm/tasty-black') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '黒豚',
              secondItem: '黒毛和牛',
              thirdItem: '黒さつま鶏',
              fourthItem: '黒酢',
              fifthItem: '黒米',
              sixthItem: 'クロマグロ',
              seventhItem: '桜島',
              eighthItem: '仙巌園',
              ninethItem: '天文館',
              tenthItem: '霧島連山',
              eleventhItem: '屋久島',
              twelvthItem: '城山公園'
            })
          );
        } else if (req.url === '/applicationForm/tasty-himuka') {
          res.write(
            pug.renderFile('./form.pug', {
              path: req.url,
              firstItem: '宮崎牛',
              secondItem: 'マンゴー',
              thirdItem: 'チキン南蛮',
              fourthItem: 'ぎょうざ',
              fifthItem: '肉巻きおにぎり',
              sixthItem: '完熟きんかん',
              seventhItem: '高千穂峡',
              eighthItem: '日南海岸',
              ninethItem: 'えびの高原',
              tenthItem: '天岩戸神社',
              eleventhItem: '南北浦海中公園',
              twelvthItem: '青島'
            })
          );
        }
        res.end();
        break;
      case 'POST':
        let rawData = '';
        req.on('data', chunk => {
            rawData = rawData + chunk;
          }).on('end', () => {
            const qs = require('querystring');
            const answer = qs.parse(rawData);
            const body = `${answer['chiiki']}の
              ${answer['ニックネーム']}さんが<br>
              ${answer['favorite']}と、<br>${answer['visit']}<br>
              をお選びくださいました。<br>
              その他のご要望:「${answer['iken']}」<br>
              **************************************<br>
              アンケートにご協力まことに<br>ありがとうございました！`;
            console.info(body);
            res.write('<!DOCTYPE html><html lang="ja"><style>body{background-color:HoneyDew}</style><body><h1 align="center">' +
              body + '</h1></body></html>');//HoneyDew(#F0FFF0)
            res.end();
          });
        break;
      default:
        break;
    }
  })
  .on('error', e => {
    console.error('Server Error', e);
  })
  .on('clientError', e => {
    console.error('Client Error', e);
  });
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.info('Listening on ' + port);
});
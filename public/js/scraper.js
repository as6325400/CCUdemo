import { launch } from 'puppeteer';
import { load } from 'cheerio';

const CHINESE_DEPART_TO_NUMBER =
{
    '文學院學士班': 1014, '中文系': 1104, '中文所': 1106, '外文系': 1154, '外文所': 1156,'歷史系': 1204, '歷史所': 1206, '哲學系': 1254, '哲學所': 1256, '英語教學所': 1366, '台文創應所': 1416,
    '理學院學士班': 2014, '數學系': 2104, '應數所': 2106, '地震所': 2156, '物理系': 2204, '物理所': 2206, '統科所':2316, '地環系': 2354, '地環所': 2356, '數學所': 2406, '分子生物所': 2456, '生醫系': 2574, '生醫所': 2576, '化生系': 2604, '化生所': 2606, '跨領域科學國際博士學位學程': 2706,
    '社福系': 3104, '社福所': 3106, '心理系': 3154, '心理所': 3156, '勞工系': 3204, '勞工所': 3206, '政治系': 3304, '政治所': 3306, '傳播系': 3354, '電傳所': 3356, '戰略所':3416, '臨床心理所': 3656, '認知科學博士學位學程': 3706, 
    '工學院學士班': 4014, '工學院碩士班': 4016,'資工系': 4104, '資工所': 4106, '電機系': 4154, '電機所': 4156, '機械系': 4204, '機械所': 4206, '化工系': 4254, '化工所': 4256, '通訊系': 4304, '通訊所': 4306, '光機電所': 4416, '前瞻製造系統碩/博士學位學程': 4456,
    '經濟系': 5104, '財金系': 5154, '財金所': 5156, '企管系': 5204, '企管所': 5206, '會資系': 5264, '會資所': 5266, '資管系': 5304, '資管所': 5306, '國經所': 5106, '國際財管碩士學位學程': 5356, '行銷管理所': 5456, '醫療資訊管理所': 5556,
    '法學院學士班': 6014, '法律所': 6056, '法律系法學組': 6104, '法律系法制組': 6204, '財法系': 6304, '財法所': 6306,
    '成教系': 7104, '成教所': 7106, '犯防系': 7254, '犯防所': 7256, '運競系': 7364, '教育所': 7156, '師培中心': 7306, '休閒教育所': 7356, '教育領導碩士學位學程': 7456, '高齡者教育所': 7506,
    '體育中心': 'F000', '通識中心': 'I001', '軍訓': 'V000', '語言中心': 'Z121' 
}

function getContents(place) 
{
    let data = [];
    async function scraper(department)
    {
        var baseUrl = "https://kiki.ccu.edu.tw/~ccmisp06/Course/";
        var baseunder = ".html";
        var depart = "";
        if(typeof department === 'number')
            depart = department.toString();
        else
            depart = department;
        const browser = await launch();
        const page = await browser.newPage();
        await page.goto(baseUrl + depart + baseunder);
        await page.waitForSelector('table');
        let body = await page.content();
        let $ = load(body);
        let rows = $('center table tbody tr').length;
        console.log("loding...")
        for(let i = 2; i <= rows; ++i)
        {
            var dataindex = [];
            if(department === 'I001')
                dataindex = [3, 5, 6, 10, 11] // 5
            else
                dataindex = [4, 5, 9, 10]; // 4
            let templist = [];
            for(let j = 0 ; j < dataindex.length; ++j)
            {
                if((department === 'I001' && dataindex[j] === 5) || (department != 'I001' && dataindex[j] === 4))
                    templist.push($(`center table tbody tr:nth-child(${i}) td:nth-child(${dataindex[j]}) font`).html().split("<br>")[0]);
                else
                    templist.push($(`center table tbody tr:nth-child(${i}) td:nth-child(${dataindex[j]}) font`).text());
            }
            data.push(templist);
        }
        await browser.close();
        console.log(data)
    };
    scraper(CHINESE_DEPART_TO_NUMBER[place]);
    return data;
}

var selection = document.querySelectorAll('#searchForm select');
console.log(selection)

import { getCourse, createCurriculum, display_list } from "./course.js"

const CHINESE_WORD_TO_NUMBER =
{
    '一': 1,
    '二': 2,
    '三': 3,
    '四': 4,
    '五': 5,
    '六': 6
}

const NUMBER_TO_CHINESE_WORD =
{
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
}

const CLASS_MAP =
{
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    '11': 11,
    '12': 12,
    '13': 13,
    '14': 14,
    '15': 15,
    'A': 1,
    'B': 2,
    'C': 3,
    'D': 4,
    'E': 5,
    'F': 6,
    'G': 7,
    'H': 8,
    'I': 9,
    'J': 10
}

var courses = []

function openModal(modalId)
{
    var modal = document.getElementById(modalId)
    modal.classList.remove('hidden')
}

export function resetTable()
{
    var cloneTable = $("#curriculum").clone()
    $("#curriculum").remove()
    cloneTable.html(`
    <tbody>
        <tr>
            <th class = 'th_title'> </th>
            <th class = 'th_title' colspan = "2">節次</th>
            <th class = 'th_title day'>星期一</th>
            <th class = 'th_title day'>星期二</th>
            <th class = 'th_title day'>星期三</th>
            <th class = 'th_title day'>星期四</th>
            <th class = 'th_title day'>星期五</th>
            <th class = 'th_title day'>星期六</th>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">1<br>07:10</td>
            <td class = "time-td">A<br>07:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">1<br>07:10</td>
            <td class = "time-td">A<br>07:15</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">2<br>08:10</td>
            <td class = "time-td">A<br>07:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">2<br>08:10</td>
            <td class = "time-td">B<br>08:45</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">3<br>09:10</td>
            <td class = "time-td">B<br>08:45</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">3<br>09:10</td>
            <td class = "time-td">B<br>08:45</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">4<br>10:10</td>
            <td class = "time-td">C<br>10:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">4<br>10:10</td>
            <td class = "time-td">C<br>10:15</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">5<br>11:10</td>
            <td class = "time-td">C<br>10:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">5<br>11:10</td>
            <td class = "time-td">D<br>11:45</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">6<br>12:10</td>
            <td class = "time-td">D<br>11:45</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">6<br>12:10</td>
            <td class = "time-td">D<br>11:45</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">7<br>13:10</td>
            <td class = "time-td">E<br>13:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">7<br>13:10</td>
            <td class = "time-td">E<br>13:15</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">8<br>14:10</td>
            <td class = "time-td">E<br>13:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">8<br>14:10</td>
            <td class = "time-td">F<br>14:45</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">9<br>15:10</td>
            <td class = "time-td">F<br>14:45</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">9<br>15:10</td>
            <td class = "time-td">F<br>14:45</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">10<br>16:10</td>
            <td class = "time-td">G<br>16:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">10<br>16:10</td>
            <td class = "time-td">G<br>16:15</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">11<br>17:10</td>
            <td class = "time-td">G<br>16:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">11<br>17:10</td>
            <td class = "time-td">H<br>17:45</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">12<br>18:10</td>
            <td class = "time-td">H<br>17:45</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">12<br>18:10</td>
            <td class = "time-td">H<br>17:45</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">13<br>19:10</td>
            <td class = "time-td">I<br>19:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">13<br>19:10</td>
            <td class = "time-td">I<br>19:15</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">14<br>20:10</td>
            <td class = "time-td">I<br>19:15</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">14<br>20:10</td>
            <td class = "time-td">J<br>20:45</td>
        </tr>
        <tr>
            <td>⠀</td>
            <td class = "time-td">15<br>21:10</td>
            <td class = "time-td">J<br>20:45</td>
        </tr>
        <tr>
            <td>⠀⠀</td>
            <td class = "time-td">15<br>21:10</td>
            <td class = "time-td">J<br>20:45</td>
        </tr>
    </tbody>
    `)
    $(".table-div").append(cloneTable)
    let rows = $("#curriculum > tbody > tr").get().slice(1)
    rows.forEach(row => {
        for(let i = 0; i < 6; ++i)
            $(row).find("td:last").after("<td></td>")
    })
    $("#curriculum").show()
}

export async function init()
{   
    await resetTable();
    getCourse();
    console.log("init");
    let print = document.getElementById("print")
    var sel1 = document.getElementById("Select1");
    var tmp = "<option selected>星期</option>";
    for(var i = 1; i < 7; ++i)
        tmp += "<option value = '" + toString(i) + "'>" + NUMBER_TO_CHINESE_WORD[i] + "</option>";
    sel1.innerHTML = tmp;
    tmp = "<option selected>開始節</option>";
    var sel2 = document.getElementById("Select2")
    for(var i = 1; i < 16; ++i)
        tmp += "<option value = '" + i + "'>" + i + "</option>";
    for(var i = 65; i < 75; ++i)
    tmp += "<option value = '" + String.fromCharCode(i) + "'>" + String.fromCharCode(i) + "</option>";
    sel2.innerHTML = tmp;
    tmp = "<option selected>結束節</option>";
    var sel3 = document.getElementById("Select3")
    for(var i = 1; i < 16; ++i)
        tmp += "<option value = '" + i + "'>" + i + "</option>";
    for(var i = 65; i < 75; ++i)
    tmp += "<option value = '" + String.fromCharCode(i) + "'>" + String.fromCharCode(i) + "</option>";
    sel3.innerHTML = tmp;
    var isUsed = new Array(); 
    for(var i = 0; i < 6; ++i)
    { 
        isUsed[i] = new Array();
        for(var j = 0; j < 30; ++j)
            isUsed[i][j] = false;
    }
    if(localStorage.course_list === undefined || localStorage.courses !== undefined)
    {
        // clear localStorage.courses and localStorage.used
        localStorage.removeItem("courses"); // delete localStorage.courses
        localStorage.used = JSON.stringify(isUsed); // set localStorage.used to isUsed (all false)
    }
    else if(localStorage.course_list !== undefined)
    {   
        var course_list = JSON.parse(localStorage.course_list);
        if(course_list.length !== 0)
        {
            for(var index = 0; index < course_list.length; index++)
            {
                let className = course_list[index]["課程名稱"]
                let courseTime = course_list[index]["上課時間"]
                let classLocation = course_list[index]["上課教室"]
                let startClass = 0
                let endClass = 0
                console.log(courseTime)
                for(let j = 0; j < courseTime.length; j++){
                    for(let k = 0; k < courseTime[j]['time'].length; k++){
                        isUsed[courseTime[j]['day'] - 1][courseTime[j]['time'][k]] = true;
                    }
                }
            }
            for(let i = 0; i < course_list.length; ++i){
                display_list(course_list[i]["課程名稱"], course_list[i]["上課教室"], course_list[i]["顯示上課時間"]);
            }
            localStorage.course_list = JSON.stringify(course_list);
            //await resetTable()
            createCurriculum().then($("#curriculum").rowspanizer())
            $("#curriculum").show()
            document.getElementById("curriculum").style.visibility = "visible";
        }
        else
        {
            getCourse()
            $("#curriculum").show();
            $("#accordion").hide();
            var list = $("#course").get()
            $(list).append(`<div id = "default">尚無任何課程資訊，輸入資訊以建立您的課表</div>`)
        }
        localStorage.used = JSON.stringify(isUsed);
        //await resetTable();
    }
    else
    {
        openModal("modal1");
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        {
            print.style.display = "none";
            openModal("modal2");
        }
        localStorage.used = JSON.stringify(isUsed);
        localStorage.courses = JSON.stringify(courses);
        document.getElementById("curriculum").style.visibility = "hidden";
        $("#accordion").hide();
        var list = $("#course").get()
        $(list).append(`<div id = "default">尚無任何課程資訊，輸入資訊以建立您的課表</div>`)
        getCourse()
    }
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        print.style.display = "none";
    // 初始化設定學分數
    display_credit();
    getCourse();
    //await resetTable();

}

window.onload = function(){
    if(localStorage.credit === undefined){
        localStorage.credit = 0;
    }
    display_credit();
}

export function display_credit(){
    let dis_credit = document.querySelectorAll("#credit");
    for(let i = 0; i < dis_credit.length; i++)
        dis_credit[i].textContent = localStorage.credit;   
}

export function clear()
{   
    console.log("clear");
    var e = document.querySelector("#accordion");
    e.innerHTML = ""
    if(e.style.display != "none")
    {
        $("#accordion").hide();
        var list = $("#course").get()
        $(list).append(`<div id = "default">尚無任何課程資訊，輸入資訊以建立您的課表</div>`)
        //var storedcourses = JSON.parse(localStorage.courses);
        var storedUsed = JSON.parse(localStorage.used);
        // for(var i = 0; i < storedcourses.length; i++)
        // {
        //     let start = 0;
        //     let end = 0;
        //     let day = CHINESE_WORD_TO_NUMBER[storedcourses[i]["上課時間"]["星期"]];
        //     if(storedcourses[i]["上課時間"]["開始節次"] >= 'A' && storedcourses[i]["上課時間"]["開始節次"] <= 'J')
        //     {
        //         start = 1 + (CLASS_MAP[storedcourses[i]["上課時間"]["開始節次"]] - 1) * 3
        //         end = 3 + (CLASS_MAP[storedcourses[i]["上課時間"]["結束節次"]] - 1) * 3
        //     }
        //     else 
        //     {
        //         start = 1 + (CLASS_MAP[storedcourses[i]["上課時間"]["開始節次"]] - 1) * 2
        //         end = CLASS_MAP[storedcourses[i]["上課時間"]["結束節次"]] * 2 
        //     }
        //     for(var j = start - 1; j < end; ++j)
        //         storedUsed[day - 1][j] = false;
        // }
        var cou = [];
        localStorage.used = JSON.stringify(storedUsed);
        localStorage.removeItem("courses");
        localStorage.removeItem("course_list");
        localStorage.courses = JSON.stringify(cou);
        getCourse();
    }
    if(localStorage.used !== undefined){
        let storedUsed = JSON.parse(localStorage.used);
        for(let i = 0; i < 6; ++i)
        {
            for(let j = 0; j <= 30; ++j)
                storedUsed[i][j] = false;
        }
        localStorage.used = JSON.stringify(storedUsed);
    }
    localStorage.credit = 0;
    display_credit();
}
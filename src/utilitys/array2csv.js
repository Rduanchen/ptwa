export function DownloadCSV (csv_array,GameName="") {
    // 獲取當前日期
    const today = new Date();

    // 獲取月份和日期，並確保它們為兩位數
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份是從 0 開始的
    const day = String(today.getDate()).padStart(2, '0');

    // 組合成 mmdd 格式
    const mmdd = month + day;

    const arrayToCSV = (arr) => {
        return arr.map(row => row.join(',')).join('\n');
    };

    var csvString = arrayToCSV(csv_array);
    csvString=  '\ufeff'+csvString; // 添加 BOM

    var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${GameName}_${mmdd}.csv`;

    document.body.appendChild(a);
    a.click();
}

export function MadeCsvFile(id,name,grade,subject,recoders,totaltime,header=["編號","正確答案","學生作答答案","是否正確","作答秒數(單題)","總耗時時間(秒)"]){
    const today = new Date();
    var csv_array = [];
    csv_array.push(["學生姓名"])
    csv_array.push(["遊玩日期",today.toLocaleDateString()])
    csv_array.push(["遊戲名稱",name])
    csv_array.push(["科目",subject])
    csv_array.push(["遊戲ID",id])
    csv_array.push(["遊戲所屬年級",grade])
    csv_array.push(["總耗時時間(秒)",totaltime])
    csv_array.push(["遊玩紀錄"])
    for(var i in recoders){
        csv_array.push(["第"+i+"關"])
        csv_array.push(header)
        for(var j in recoders[i]){
            var temp=[]
            temp.push(j)
            for(var k in recoders[i][j]){
                temp.push(recoders[i][j][k])
            }
            csv_array.push(temp)
        }
    }
    return csv_array;
}

export function ArrayTemplate2Record(arr, level, time,totaltime){
    var templatecode ={
        "%%level%%":level, // 關卡
        "%%time%%":time, // 已用時間
        "%%totaltime%%":totaltime // 總耗時時間(秒)
    }
    arr.forEach((element,index) => {
        if(element in templatecode){
            arr[index]=templatecode[element];
        }
    });
    return arr;
}
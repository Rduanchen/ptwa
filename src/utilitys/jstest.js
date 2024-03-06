function MadeCsvFile(id,name,grade,recoders,header=["編號","正確答案","學生作答答案","是否正確","作答秒數(累計)"]){
    const today = new Date();
    var csv_array = [];
    csv_array.push(["學生姓名"])
    csv_array.push(["遊玩日期",today.toLocaleDateString()])
    csv_array.push(["遊戲名稱",name])
    csv_array.push(["遊戲ID",id])
    csv_array.push(["遊系所屬年級",grade])
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

function ArrayTemplate2record(arr, level, time){
    var templatecode ={
        "%%level%%":level, // 關卡
        "%%time%%":time // 已用時間
    }
    arr.forEach((element,index) => {
        if(element in templatecode){
            arr[index]=templatecode[element];
        }
    });
    return arr;
}


var data = [234,234,'是',"%%time%%","%%level%%"]
var header = ["編號","正確答案","學生作答答案","是否正確","作答秒數(累計)"]
data=ArrayTemplate2record(data, 1, 10)
console.log(data)

var data2= [[
                data,
                data
            ],
            [
                data,
                data
            ],
            [
                data,
                data
            ],
            [
                data,
                data
            ]
        ]
console.log(data2)
console.log(MadeCsvFile(122,"game",3,data2,header))
        for(var j in recoders[i]){
            var temp=[]
            temp.push(j)
            for(var k in recoders[i][j]){
                temp.push(recoders[i][j][k])
            }
            csv_array.push(temp)
        }
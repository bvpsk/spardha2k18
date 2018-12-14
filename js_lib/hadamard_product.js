function hadamard_product(a,b){
                if(typeof(a) == 'number' || a.shape == (1) || a.shape[1] == 1){
                    if(typeof(a) == 'object'){
                    if(a.shape == (1)){
                        
                        a = a.tolist();
                        a = a[0];
                    }
                    else {
                        if(a.shape[1]== 1){
                        a = a.tolist();
                        a = a[0][0];
                    }
                         }}
                    b_dim = b.shape;
                    b = b.tolist();
                    for(var i = 0;i<b_dim[0];i++){
                        for(var j = 0;j < b_dim[1];j++){
                            b[i][j] = b[i][j] * a;
                        }
                    }
                    return nj.array(b);
                }
                if(typeof(b) == 'number' || b.shape == (1) || b.shape == (1,1)){
                    if(typeof(b) == 'object'){
                    if(b.shape = (1)){
                        b = b.tolist();
                        b = b[0];
                    }
                    else {
                        if(b.shape = (1,1)){
                        b = b.tolist();
                        b = b[0][0];
                    }
                         }}
                    a_dim = a.shape;
                    a = a.tolist();
                    for(var i = 0;i<a_dim[0];i++){
                        for(var j = 0;j < a_dim[1];j++){
                            a[i][j] = a[i][j] * b;
                        }
                    }
                    return nj.array(a);
                }
            var a_dim = a.shape;
            var b_dim = b.shape;
            if(a_dim == b_dim){
                return nj.multiply(a,b);
            } else{
                
                for(var i  = 0;i < b_dim.length;i++){
                    if(b_dim[i] == 1){
                        var temp = a;
                        a = b;
                        b = temp;
                        a_dim = a.shape;
                        b_dim = b.shape;
                        break;
                       }
                }
                var temp = a.tolist();
                if(a_dim[1] == 1){
                    for(var i = 0;i < a_dim[0];i++){
                        var pointing = temp[i][0];
                        for(var j = 1;j < b_dim[1];j++){
                            temp[i].push(pointing);
                        }
                    }
                    return nj.array(temp);
                   }else{
                       $('.t').html("b");
                       if(a_dim[0] == 1){
                           var pointing = temp[0];
                           for(var i = 1;i < b_dim[0];i++){
                               temp.push(pointing);
                           }
                           
                          }
                       return nj.array(temp);
                   }
                
            }
            return "nope";
        }
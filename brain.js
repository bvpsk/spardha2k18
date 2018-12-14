class BRAIN{
    constructor(){
        this.weights = [hadamard_product(0.01,nj.random([10,9])),hadamard_product(0.01,nj.random([4,10]))];
        this.biases = [hadamard_product(0.01,nj.random([10,1])),hadamard_product(0.01,nj.random([4,1]))];
        this.a = [[],[],[]];
        this.h = [[],[],[]];
    }
    forward_pass(inputs){
        inputs = inputs.slice();
        this.a[0] = inputs.slice();
        this.a[1][0] = nj.sigmoid(nj.add(nj.dot(this.weights[0],this.a[0][0]),this.biases[0]));
        for(var i = 0;i < this.a.length - 1;i++){
            this.a[i+1][0] = nj.sigmoid(nj.add(nj.dot(this.weights[i],this.a[i][0]),this.biases[i]));
            this.h[i+1][0] = nj.sigmoid(this.a[i+1][0]);
        }
    }
    predict(){
        this.result = this.h[2][0].tolist();
        let max = 0;
        for(var i = 1;i < this.result.length;i++){
            if(this.result[max]<this.result[i]){
                max = i;
            }
        }
        if(this.result[0] == this.result[max]){
            return 1;
        }else if(this.result[1] == this.result[max]){
            return 2;
        }else if(this.result[2] == this.result[max]){
            return 3;
        }else{
            return 4;
        }
    }
}
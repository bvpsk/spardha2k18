function f(x){
    return nj.sigmoid(x);
}
function f_dash(x){
    return nj.multiply(f(x),(nj.subtract(nj.ones(x.shape),f(x))));
}
function feed_forward(W,B,x){
    var w1 = W[0];
    var w2 = W[1];
    var b1 = B[0];
    var b2 = B[1];
    var z1 = nj.add(nj.dot(w1,x),b1);
    var a1 = f(z1);
    var z2 = nj.add(nj.dot(w2,a1),b2);
    var a2 = f(z2);
    return [z1,a1,z2,a2];
}
function back_propagation(y,ff,W,x){
    var djdb2 = hadamard_product(nj.subtract(ff[3],y),f_dash(ff[2]));
    var djdw2 = hadamard_product(djdb2,ff[1].T);
    var djdb1 = hadamard_product(hadamard_product(djdb2,W[1].T),f_dash(ff[0]));
    var djdw1 = nj.dot(djdb1,x.T);
    return [djdw1,djdb1,djdw2,djdb2];
    
}
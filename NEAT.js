let innovation_number = 1;
let input_nodes = [],output_nodes = [],input_size = 9,output_size = 4;
class NODE{
    constructor(innovation_number){
        this.connections = [];
        this.enabled = true;
        this.val = 0;
        this.innovation_number = innovation_number;
        this.elitism = Infinity;
    }
    clone(){
        let cloned = new NODE(this.innovation_number);
        cloned.connections = [];
        cloned.val = 0;
        for(var i = 0;i < this.connections.length;i++){
            cloned.connections.push(this.connections[i].clone());
        }
        return cloned;
    }
}
class CONNECTION{
    constructor(in_node_innovation_number,out_node_innovation_number){
        this.in = in_node_innovation_number;
        this.out = out_node_innovation_number;
        this.weight = Math.random()*0.01;
    }
    clone(){
        let cloned = new CONNECTION(this.in,this.out);
        cloned.val = this.val;
        cloned.weight = this.weight;
        return cloned;
    }
}
class INPUT_NODE{
    constructor(index,innovation_number){
        this.index = index;
        this.innovation_number = innovation_number;
        this.val = 0;
        this.enabled = true;
        this.connections = [];
    }
    clone(){
        let cloned = new INPUT_NODE(this.index);
        cloned.val = 0;
        cloned.innovation_number = this.innovation_number;
        cloned.connections = [];
        for(var i = 0;i < this.connections.length;i++){
            cloned.connections.push(this.connections[i].clone());
        }
        return cloned;
    }
}
class OUTPUT_NODE{
    constructor(index){
        this.index = index;
        this.val = 0;
        this.innovation_number = index.toString() + "out";
    }
    clone(){
        let cloned = new OUTPUT_NODE(this.index);
        cloned.innovation_number = this.innovation_number;
        cloned.val = 0;
        return cloned;
    }
}
for(var i = 0;i < input_size;i++){
    input_nodes.push(new INPUT_NODE(i,innovation_number));
    innovation_number+=1;
}
for(var i = 0;i < output_size;i++){
    output_nodes.push(new OUTPUT_NODE(i));
}
class GENOME{
    constructor(){
        this.nodes = [];
        this.inputs = [];
        this.outputs = [];
        this.fitness = 0;
        input_nodes.forEach((node)=>{
            this.inputs.push(node.clone());
        });
        output_nodes.forEach((node)=>{
            this.outputs.push(node.clone());
        });
        for(var i = 0;i < input_size;i++){
            this.nodes.push(this.inputs[i]);
        }
        this.outputs.forEach((out)=>{
            this.nodes.forEach((node)=>{
                node.connections.push(new CONNECTION(node.innovation_number,out.innovation_number));
            });
        });
    }
    add_node(in_node,out_node){
        let added_node = new NODE(innovation_number);
        innovation_number+=1;
        added_node.connections.push(new CONNECTION(added_node.innovation_number,out_node.innovation_number));
        added_node.connections[0].weight = 1;
        for(var i = 0;i < in_node.connections.length;i++){
            if(in_node.connections[i].out === out_node.innovation_number){
                in_node.connections[i].out = added_node.innovation_number;
                break;
            }
        }
        let ai = 0;
        for(ai = 0;ai < this.nodes.length;ai++){
            if(this.nodes[ai].innovation_number >= added_node.innovation_number){
                break;
            }
        }
        this.nodes.splice(ai,0,added_node);
    }
    add_connection(in_node,out_node){
        in_node.connections.push(new CONNECTION(in_node.innovation_number,out_node.innovation_number));
    }
    clone(){
        let cloned = new GENOME();
        cloned.nodes = [];
        cloned.inputs = [];
        cloned.outputs = [];
        cloned.fitness = 0;//
        this.nodes.forEach((node)=>{
            cloned.nodes.push(node.clone(cloned));
        });
        this.inputs.forEach((node)=>{
            cloned.inputs.push(node.clone(cloned));
        });
        this.outputs.forEach((node)=>{
            cloned.outputs.push(node.clone(cloned));
        });
        return cloned;
    }
    forward_pass(){
        let nodes_to_visit = [...this.inputs];
        let temp_nodes = [],tn;
        while(nodes_to_visit.length != 0){
            console.log(nodes_to_visit);
            nodes_to_visit.forEach((node)=>{
                if(node.enabled){
                    node.connections.forEach((con)=>{
                        tn = this.nodes.findIndex((nn)=>{
                            return nn.innovation_number === con.out;
                        });
                        if(tn != -1){
                            this.nodes[tn].val+=node.val*con.weight;
                            tn = this.nodes[tn];
                        }else{
                            tn = this.outputs.findIndex((nn)=>{
                                return nn.innovation_number === con.out;
                            });
                            this.outputs[tn].val+=node.val*con.weight;
                            tn = this.outputs[tn];
                        }
                        if(temp_nodes.findIndex((n)=>{return tn === n;}) === -1 && tn.constructor.name != "OUTPUT_NODE"){
                            temp_nodes.push(tn);
                        }
                    });
                }
            });
            nodes_to_visit = temp_nodes.slice();
            temp_nodes = [];
        }
    }
    mutate(){
        this.nodes.forEach((node)=>{
            if(Math.random() <= 0.09 ){
                node.enabled = !node.enabled;
            }
            node.connections.forEach((con)=>{
                if(Math.random() <= 0.1){
                    if(Math.random() <= 0.85){
                        if(Math.random() <= 0.5){
                            con.weight+=(Math.random()*0.001);
                        }else{
                            con.weight-=(Math.random()*0.001);
                        }
                    }else{
                        con.weight = Math.random()*0.01;
                    }
                }
            });
        });
    }
}
class MODEL{
    constructor(){
        this.genomes = [];
        this.species = [];
        this.threshold = NaN;
        this.c1 = NaN;
        this.c2 = NaN;
        this.c3 = NaN;
    }
    speciate(){
        let medoids_count  = Math.floor(this.genomes.length*0.15),thresh_vals = [];
        this.species = [];
        for(var i = 0;i < medoids_count;i++){
            this.species.push([this.genomes[Math.floor(Math.random()*this.genomes.length)]]);
        }
        this.genomes.forEach((gene)=>{
            if(this.species.findIndex((sp)=>{
                return sp[0] === gene;
            }) == -1)
            {
                thresh_vals = [];
                for(var i = 0;i < this.species.length;i++){
                    thresh_vals.push(this.compatibility(gene,this.species[i][0]));
                }
                let min_thresh = 0;
                for(var i = 0;i<thresh_vals.length;i++){
                    if(thresh_vals[i] < thresh_vals[min_thresh]){
                        min_thresh = i;
                    }
                }
                if(this.species[min_thresh].findIndex((sp)=>{
                    return sp === gene;
                }) == -1){
                    this.species[min_thresh].push(gene);
                }
        }
        });
    }
    compatibility(g1,g2){
        let del,E = 0,D = 0,W_avg = 0,N,dominant,lateral,temp;
        if(g1.nodes.length < g2.nodes.length){
            dominant = g1;
            lateral = g2;
        }else{
            dominant = g2;
            lateral = g1;
        }
        N = dominant.nodes.length;
        let max_innov = dominant.nodes[dominant.nodes.length - 1].innovation_number;
        let dominant_compatibility_array = [],lateral_compatibility_array = [],lateral_cons = [];
        lateral.nodes.forEach((node)=>{
            lateral_cons.push(...node.connections);
        });
        for(var i = 0;i < max_innov;i++){
            dominant_compatibility_array.push(-1);
            lateral_compatibility_array.push(-1);
        }
        dominant.nodes.forEach((node)=>{
            dominant_compatibility_array[node.innovation_number - 1] = node.innovation_number;
        });
        lateral.nodes.forEach((node)=>{
            lateral_compatibility_array[node.innovation_number - 1] = node.innovation_number;
        });
        for(var i = 0;i < max_innov;i++){
            if(dominant_compatibility_array[i] != -1){
                if(lateral_compatibility_array[i] != -1){
                    dominant.nodes[i].connections.forEach((con)=>{
                        temp = lateral_cons.findIndex((c)=>{
                            return (c.in === con.in && c.out === con.out);
                        });
                        if(temp != -1){
                            W_avg+=(0.5*(con.weight+lateral_cons[temp].weight));
                            lateral_cons.splice(temp,1);
                        }
                    });
                }else if(dominant_compatibility_array[i] <= lateral.nodes[lateral.nodes.length - 1].innovation_number){
                    D+=1;
                }
                if(dominant_compatibility_array[i] > lateral.nodes[lateral.nodes.length - 1].innovation_number){
                    E+=1;
                }
            }else{
                if(lateral_compatibility_array[i] != -1){
                    D+=1;
                }
            }
        }
        W_avg = W_avg/2;
        del = (this.c1*E + this.c2*D)/N + this.c3*W_avg;
        return del;
    }
    cross_over(g1,g2){
        let offspring = new GENOME();
        offspring.inputs = [];
        offspring.nodes = [];
        let dominant,lateral,ai;
        if(g1.fitness > g2.fitness){
            dominant = g1;
            lateral = g2;
        }else{
            dominant = g2;
            lateral = g1;
        }
        for(var i = 0;i < dominant.nodes.length;i++){
            if(lateral.nodes.findIndex((node)=>{
                return node.innovation_number === dominant.nodes[i].innovation_number;
            }) != -1){
                if(Math.random() <= 0.5){
                    ai = 0;
                    for(ai = 0;ai < offspring.nodes.length;ai++){
                        if(offspring.nodes[ai].innovation_number >= dominant.nodes[i].innovation_number){
                            break;
                        }
                    }
                    offspring.nodes.splice(ai,0,dominant.nodes[i].clone());
                }else{
                    ai = 0;
                    for(ai = 0;ai < offspring.nodes.length;ai++){
                        if(offspring.nodes[ai].innovation_number >= lateral.nodes.find((node)=>{
                            return node.innovation_number === dominant.nodes[i].innovation_number;
                        }).innovation_number){
                            break;
                        }
                    }
                    offspring.nodes.splice(ai,0,lateral.nodes.find((node)=>{
                        return node.innovation_number === dominant.nodes[i].innovation_number;
                    }).clone());
                }
            }else{
                ai = 0;
                    for(ai = 0;ai < offspring.nodes.length;ai++){
                        if(offspring.nodes[ai].innovation_number >= dominant.nodes[i].innovation_number){
                            break;
                        }
                    }
                    offspring.nodes.splice(ai,0,dominant.nodes[i].clone());
            }
        }
        console.log(offspring.nodes);
        let void_cons = [];
        offspring.nodes.forEach((node)=>{
            void_cons = [];
            for(var i = 0;i < node.connections.length;i++){
                if(offspring.nodes.findIndex((n)=>{
                    return n.innovation_number === node.connections[i].out;
                }) === -1 && typeof(node.connections[i].out) != "string"){
                    void_cons.push(i);
                }
            }
            for(var i = 0;i < void_cons.length;i++){
                node.connections.splice(void_cons[i] - i,1);
            }
            if(node.constructor.name === "INPUT_NODE"){
                offspring.inputs.push(node);
            }
        });
        return offspring;
    }
}

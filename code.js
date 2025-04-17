function tsp_hk(distance_matrix) {
    if(distance_matrix.length < 2) {return 0;}
    var cache = [];

    function heldKarp(cities, start) {
        //if |cities| == 2: return length between those two cities
        if(cities.length == 2) {return cities[0][1];}

        //Check cache for to see if this subset has been processed before
        var key = JSON.stringify(cities);
        if(cache[key] === undefined) {cache[key] = [];}
        if(cache[key][start] !== undefined) {return cache[key][start];}
    
        //Get minimum for held-karp of the rest of the graph
        var min = Infinity;
        var trimmed = graphTrim(cities, start);
        for(var i = 0; i < trimmed.length; i++) {
            min = Math.min(min, 
                heldKarp(trimmed, i) + cities[start][i < start ? i : i+1]);
        }
        cache[key][start] = min;
        return min;
    }

    //|V| different start positions at beginning
    var min = Infinity;
    for(var city in distance_matrix) {
        min = Math.min(min, heldKarp(distance_matrix, city));
    }
    return min;
}

//Returns a trimmed graph without a specific vertex
function graphTrim(graph, vertex) {
    var copy = JSON.parse(JSON.stringify(graph));
    copy.splice(vertex, 1);
    for(var i = 0; i < copy.length; i++) {
        copy[i].splice(vertex, 1);
    }
    return copy;
}
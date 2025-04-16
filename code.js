function tsp_hk(distance_matrix) {
    if(distance_matrix.length < 2) {return 0;}
    var cache = [];

    function heldKarp(cities, start) {
        if(cities.length == 2) {return cities[0][1];}
        var key = JSON.stringify(cities);
        if(cache[key] === undefined) {cache[key] = [];}
        if(cache[key][start] !== undefined) {return cache[key][start];}
    
        var min = Infinity;
        var trimmed = graphTrim(cities, start);
        for(var i = 0; i < trimmed.length; i++) {
            min = Math.min(min, 
                heldKarp(trimmed, i) + cities[start][i < start ? i : i+1]);
        }
        cache[key][start] = min;
        return min;
    }

    var min = Infinity;
    for(var city in distance_matrix) {
        min = Math.min(min, heldKarp(distance_matrix, city));
    }
    return min;
}

function graphTrim(graph, vertex) {
    var copy = JSON.parse(JSON.stringify(graph));
    copy.splice(vertex, 1);
    for(var i = 0; i < copy.length; i++)
    {
        copy[i].splice(vertex, 1);
    }
    return copy;
}
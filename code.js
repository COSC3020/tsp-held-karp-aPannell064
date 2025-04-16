function tsp_hk(distance_matrix) {
    if(distance_matrix.length < 2) {return 0;}
    var path;
    var min = Infinity;
    for(var city in distance_matrix) {
        path = heldKarp(distance_matrix, city);
        if(path < min) {min = path};
    }
    return min;
}

function heldKarp(cities, start) {
    if(cities.length == 2) {return cities[0][1];}
    var path;
    var min = Infinity;
    var trimmed = graphTrim(cities, start)
    for(var i = 0; i < trimmed.length; i++) {
        path = heldKarp(trimmed, i) + cities[start][i < start ? i : i+1];
        if(path < min) {min = path};
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
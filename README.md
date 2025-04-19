# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

Because we are using memoization, in the worst case we would have to process almost 
every element in the superset of the graph once and only once. We are only calling 
the function for almost every subset of the graph because we stop at subsets with a 
length of 2. The superset of a graph in this case would contain $2^{|V|}$ elements. 
Even though we stop short, that won't impact the complexity because asymptotically, 
an insignificant part of the superset is being excluded. During each call, my 
implementation gets a trimmed version of the graph that doesn't have the start vertex 
in it. Because the graph needs to stay intact for future calls, a deep copy of the graph 
is made, which means that all $|V|^2$ elements in the adjacency matrix must be copied. 
Therefore, the final time complexity is $\Theta(2^{|V|} \cdot |V|^2)$. 

The memory complexity is similar to the time complexity. Every single matrix that gets passed 
into the function gets stored in the cache. Therefore, the cache will include most of the superset 
of the graph (excluding subsets with two or fewer vertices), the number of vertices in the graph 
will have a complexity of $2^{|V|}$. In each of those entries, there will be a key, which is a subset 
of the graph (complexity of $|V|^2$), as well as a set of entries. The number of entries will be equal 
to the number of vertices passed into the function call (linear complexity). Since the submatrices, are 
more significant, the cache will just have a complexity of $\Theta(2^{|V|} \cdot |V|^2)$. Additionally, 
copies of the matrix are made when trimming. Each trimmed graph will have a complexity of $|V|^2$. 
However, the recursive stack can only go $|V|$ calls deep because a vertex is removed on each call. 
Therefore, this will not impact the complexity, so we will still have a memory complexity of 
$\Theta(2^{|V|} \cdot |V|^2)$.

### Analysis after changes

After being told that I didn't take into account the same subset of elements with a different 
order, I wanted to make cities easier to sort, I decided to only store the cities in the cache
instead of the entire graph like before. As a result, the memory complexity was reduced to 
$\Theta(2^{|V|} \cdot |V|)$.

Initially, I thought that the time complexity would also be reduced, but as I was debugging my
revision, I realized that the function is not called roughly $2^{|V|}$ times with unique arguments, 
but actually closer to $2^{|V|} \cdot |V|$ times. This is because each unique value in the cache also 
includes the maximum of $|V|$ start nodes and a function call has to be made for each one. The for loop 
inside the function also has a complexity of $|V|$. Therefore, there will still be a time complexity of 
$\Theta(2^{|V|} \cdot |V|^2)$, even if my original analysis was at least partially incorrect. 

## Extra Help 

I used the memoization solution for the knapsack problem on the slides to help me figure out how 
to do it here, so it is very similar to that. 

I used https://www.geeksforgeeks.org/how-to-remove-a-specific-item-from-an-array-in-javascript/ 
because I wanted a convenient way to remove an element from an array. 

"I certify that I have listed all sources used to complete this exercise, 
including the use of any Large Language Models. All of the work is my own, 
except where stated otherwise. I am aware that plagiarism carries severe 
penalties and that if plagiarism is suspected, charges may be filed against 
me without prior notice."

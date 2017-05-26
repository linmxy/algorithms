const vertices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const edges = {
  a: ['b'], 
  b: ['c'], 
  c: ['d', 'e'],
  d: ['c', 'g'],
  e: ['f'],
  f: ['h'],
  g: ['h']
};
//initialize vertex
Object.keys(stations).forEach(vertex => {
  vertices.push(vertex);
  edges[vertex] = [];
});
Object.keys(lines).forEach(lineKey => {
  const {color, name, route} = lines[lineKey];
  route.reduce((from, to) => {
    edges[from].push(to);
    edges[to].push(from);
    return to;
  });
});

const pathFromTo = (source, destination) => {
  debugger;
  if (!vertices.indexOf(destination)) {
    return console.log('Vertex not found');
  }
  var stack = [], paths = [], visitedEdge = [];
  let cleanEdgeStatus = () => { //remove all visited edges if both vetex are not in current stack.
    visitedEdge = visitedEdge.filter(edge => {
      let {start, end} = edge;
      return stack.indexOf(start) >= 0 || stack.indexOf(end) >= 0;
    });
  };
  stack.push(source);
  while (stack.length) {
    const current = stack[stack.length - 1];
    if (current === destination) { //we just found a path.
      paths.push([...stack]); //save path
      cleanEdgeStatus();
      stack.pop();
    } else {
      //find vertex that not in stack yet, and not in visited edges;
      const next = edges[current].find(n => {
        return !visitedEdge.find(edge => edge.start === current && edge.end === n) && stack.indexOf(n) < 0;
      });
      if (next) {
        visitedEdge.push({start: current, end: next});
        stack.push(next);
      } else {
        cleanEdgeStatus();
        stack.pop();
      }
    }
  }
  return paths;
}

pathFromTo('a', 'h');

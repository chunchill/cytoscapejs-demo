$(function () { // on dom ready

  var cy = cytoscape({
    container: document.getElementById('cy'),

    boxSelectionEnabled: false,
    autounselectify: true,

    style: cytoscape.stylesheet()
      .selector('node')
      .css({
        'content': 'data(text)'
      })
      .selector('edge')
      .css({
        'content': 'data(label)',
        'target-arrow-shape': 'triangle',
        'width': 4,
        'line-color': '#ddd',
        'target-arrow-color': '#ddd',
        'curve-style': 'bezier'
      })
      .selector('.highlighted')
      .css({
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      }),

    elements: {
      nodes: [
        { data: { id: 'a', text: '陈骏' } },
        { data: { id: 'b', text: '邵剑秋' } },
        { data: { id: 'c', text: 'IT部门' } },
        { data: { id: 'd', text: '陈宇' } }
      ],

      edges: [
        { data: { id: 'ac', label: '属于', weight: 1, source: 'a', target: 'c' } },
        { data: { id: 'ac2', label: '商务上属于', weight: 1, source: 'a', target: 'c' } },
        { data: { id: 'bc', label: '属于', weight: 1, source: 'b', target: 'c' } },
        { data: { id: 'bc2', label: '商务上属于', weight: 1, source: 'b', target: 'c' } },
        { data: { id: 'dc', label: '属于', weight: 1, source: 'd', target: 'c' } },
        { data: { id: 'dc2', label: '商务上属于', weight: 1, source: 'd', target: 'c' } },
        { data: { id: 'ab', label: '汇报给', weight: 1, source: 'a', target: 'b' } },
        { data: { id: 'db', label: '汇报给', weight: 1, source: 'd', target: 'b' } }

      ]
    },

    layout: {
      name: 'breadthfirst',
      directed: true,
      roots: '#a',
      padding: 10
    }
  });

  var bfs = cy.elements().bfs('#a', function () { }, true);

  var i = 0;
  var highlightNextEle = function () {
    if (i < bfs.path.length) {
      bfs.path[i].addClass('highlighted');

      i++;
      setTimeout(highlightNextEle, 1000);
    }
  };

  // kick off first highlight
  highlightNextEle();

}); // on dom ready
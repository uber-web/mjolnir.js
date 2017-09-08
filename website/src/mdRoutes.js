import overview from '../../docs/README.md';
import install from '../../docs/get-started/README.md';
import integrating from '../../docs/advanced/integrating.md';
import pointerEvents from '../../docs/advanced/pointer-events.md';
import EventManager from '../../docs/api-reference/event-manager.md';

export default [{
  name: 'Documentation',
  path: '/documentation',
  data: [{
    name: 'Overview',
    markdown: overview
  }, {
    name: 'Get started',
    children: [{
      name: 'Installation',
      markdown: install
    }]
  }, {
    name: 'Advanced',
    children: [{
      name: 'Other Event Systems',
      markdown: integrating
    }]
  }, {
    name: 'API Reference',
    children: [{
      name: 'EventManager',
      markdown: EventManager
    }]
  }]
}];

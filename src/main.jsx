import { render } from 'preact';
import { App } from './components/App.jsx';
import 'preact/debug';
import './index.css';

render(<App />, document.getElementById('app'));

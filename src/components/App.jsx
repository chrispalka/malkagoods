import { useState } from 'preact/hooks';

import './App.css';
import { SideNav } from './SideNav';

export function App() {
  return (
    <>
      <SideNav />
      <div className='wrapper'>Hi</div>
    </>
  );
}

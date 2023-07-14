import { ReactElement } from 'react';
import Nav from './nav';

function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}

export default Layout;

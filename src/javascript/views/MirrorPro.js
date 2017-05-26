import React from 'react';
import './MirrorPro.scss';
import { APPLICATION_VERSION } from '../settings/constants';
import Menu from '../containers/Menu/Menu';
import Grid from '../containers/Grid/Grid';
import Navigation from '../containers/Navigation/Navigation';
import Status from '../containers/Status/Status';

/**
 * MirrorPro view layout.
 *
 * @class      MirrorPro
 * @return     {Node}  The mirror pro view layout.
 */
export const MirrorPro = () => {
  return (
    <div className="MirrorProView">
      <header className="MirrorProView-Header">
        <div className="MirrorProView-Title">
          <span className="MirrorProView-Text">MIRROR PRO</span>
          <span className="MirrorProView-Text __version">{`v${APPLICATION_VERSION}`}</span>
        </div>
      </header>
      <section className="MirrorProView-Section">
        <div className="MirrorProView-Menu">
          <Menu />
        </div>
        <div className="MirrorProView-Grid">
          <Grid />
        </div>
        <div className="MirrorProView-Navigation">
          <Navigation />
        </div>
      </section>
      <footer className="MirrorProView-Footer">
        <Status />
      </footer>
    </div>
  );
};

export default MirrorPro;

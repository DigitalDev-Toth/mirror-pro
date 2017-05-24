import React from 'react';
import './MirrorPro.scss';
import PrimaryMenu from '../containers/Menu/PrimaryMenu';
import SecondaryMenu from '../containers/Menu/SecondaryMenu';
import Grid from '../containers/Grid/Grid';

/**
 * Class for mirror pro.
 *
 * @class      MirrorPro (name)
 */
export const MirrorPro = () => {
  return (
    <div className="Layout">
      <div className="Layout-Top">
        {
          // Top side
        }
      </div>
      <div className="Layout-Middle">
        <div className="Layout-SideBar">
          <PrimaryMenu />
        </div>
        <div className="Layout-Grid">
          <Grid />
        </div>
        <div className="Layout-RightBar">
          {
            // Navigation bar
          }
        </div>
      </div>
      <div className="Layout-Bottom">
        <SecondaryMenu />
      </div>
    </div>
  );
};

export default MirrorPro;

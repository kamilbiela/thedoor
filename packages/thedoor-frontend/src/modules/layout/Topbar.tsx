import * as React from 'react';
import TopbarInfo from './TopbarInfo';

interface Props {
}

const Topbar: React.FC<Props> = () => {
  return (
    <div className="topbar">
      <TopbarInfo title="Balance" value="213 920 $"/>
      <TopbarInfo title="Payout" value="159 465 $"/>
    </div>
  );
}

export default Topbar;

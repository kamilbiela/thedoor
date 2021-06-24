import * as React from 'react';

interface Props {
  title: string;
  value: string | number;
}

const TopbarInfo: React.FC<Props> = ({title, value}) => {
  return (
    <div className="topbar__info">
      <div className="topbar__info__title">
        {title}
      </div>
      <div className="topbar__info__value">
        {value}
      </div>
    </div>
  );
}

export default TopbarInfo;

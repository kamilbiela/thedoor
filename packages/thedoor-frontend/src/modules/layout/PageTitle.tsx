import * as React from 'react';

interface Props {
  title: string;
}

const PageTitle: React.FC<Props> = ({title}) => {
  return (
    <div className="page-title">
      {title}
    </div>
  );
}

export default PageTitle;

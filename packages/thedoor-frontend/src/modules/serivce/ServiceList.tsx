import * as React from 'react';
import { ServiceListItem } from "thedoor-common";
import { CopyToClipboard } from 'react-copy-to-clipboard';
 import { toast } from 'react-toastify';

interface Props {
  services: ServiceListItem[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const ServiceList: React.FC<Props> = ({ services, isLoading, hasMore, onLoadMore }) => {
  return (
    <>
      <div className="list">
        {services.map(s => (
          <div key={s.id} className="list__item list__item--service">
            <div className="list__item__col list__item__col--main">
              <div className="list__item__title">
                {s.name}
              </div>
              <div className="list__item__description">
                {s.description}
              </div>
            </div>
            <div className="list__item__col">
              <div className="promocode">
                <label className="promocode__title">Promocode</label>
                <div className="promocode__code">
                  promocode
                  <CopyToClipboard text={s.promocode} onCopy={() => toast('Promotion code copied') }>
                    <button className="promocode__code__copy" aria-label="Copy promotion code"></button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div className="list__item__col">
              <div className="list__item__form">
                <button type="button" onClick={() => {
                  toast("Bonus activated (@todo ajax call)");
                }}>Activate bonus</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="load-more">
          <button onClick={() => onLoadMore()}> Load more </button>
        </div>
      )}

      {isLoading && (
        <div className="is-loading">
          Loading
        </div>
      )}

      {services.length === 0 && !isLoading && (
        <div className="alert alert--info">
          No Services
        </div>
      )}
    </>
  );
}

export default ServiceList;

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import Topbar from './modules/layout/Topbar';
import Sidebar from './modules/layout/Sidebar';
import PageTitle from './modules/layout/PageTitle';
import ServiceListFilter from './modules/serivce/ServiceListFilter';
import ServiceList from './modules/serivce/ServiceList';
import { ToastContainer } from 'react-toastify';
import { ServiceListItem } from '../../thedoor-common';

import apiService from './services/ApiService';

const App: React.FC<{}> = () => {
  const [serviceNameFilter, setServiceNameFilter] = React.useState('');
  const [services, setServices] = React.useState<ServiceListItem[]>([]);
  const [isLoadingServices, setIsLoadingServices] = React.useState(false);
  const [nextPage, setNextPage] = React.useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    (async () => {
      setIsLoadingServices(true);
      const responseData = await apiService.getList({filterByName: serviceNameFilter, page: currentPage});
      setServices(s => [...s, ...responseData.data]);
      setNextPage(responseData.next);
      setIsLoadingServices(false);
    })();
  }, [serviceNameFilter, currentPage]);

  const onLoadMore = React.useCallback(() => {
    setCurrentPage(nextPage || 1);
  }, [nextPage]);

  return (
    <>
      <ToastContainer />
      <Topbar />
      <Sidebar />

      <div className="content">
        <PageTitle title="Services" />
        <ServiceListFilter onFilter={(filter) => {
          setServices([]);
          setServiceNameFilter(filter);
        }} />
        <ServiceList services={services} isLoading={isLoadingServices} hasMore={!!nextPage} onLoadMore={onLoadMore} />
      </div>
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
import {
  CardFourMbl,
  CardOneMbl,
  CardThreeMbl,
  CardTwoMbl,
  ChartOneMbl,
  ChartTwoMbl,
} from '../../components/MobileAppDashboard';

import SearchComponent from '../../components/Search.tsx';
import Modal from '../../components/Modal.tsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecentRegistrationsCard from '../../components/MobileAppDashboard/RecentRegistrationsCard.tsx';

const MobileApp = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activitiesData, setActivitiesData] = useState<any>([]);

  const getActivitiesHistory = async () => {
    try {
      const apiUrl = `http://132.10.100.221:9912/webservices/users/services/top10activities`;
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const data = response.data;
        setActivitiesData(data);
      } else {
        console.error(
          `Failed to fetch user results. Status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearch = async (searchTerm: any) => {
    try {
      const apiUrl = `http://132.10.100.221:9912/webservices/users/search?search=${encodeURIComponent(
        searchTerm,
      )}`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowModal(true);
      } else {
        console.error(
          `Failed to fetch search results. Status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    getActivitiesHistory();
  }, []);

  return (
    <>
      <SearchComponent
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardThreeMbl />
        <CardOneMbl />
        <CardTwoMbl />
        <CardFourMbl />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOneMbl />
        <ChartTwoMbl />
        <div className="col-span-12 xl:col-span-8">
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Recent Activities
              </h4>
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    {/* <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Activity ID
                    </th> */}
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      PIN
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Name
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Activity
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activitiesData?.map((item: any) => (
                    <tr key={item.id}>
                      {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.id}</p>
                      </td> */}
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">{item.PIN}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.firstname} {item.lastname}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {item.activity}
                        </h5>
                        <p className="text-sm">{item.comments}</p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full ${
                            item.status === 'success'
                              ? 'bg-success bg-opacity-10 text-success'
                              : 'bg-danger bg-opacity-10 text-danger'
                          } py-1 px-3 text-sm font-medium`}
                        >
                          {item.status === 'success' ? 'Success' : 'Failed'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <RecentRegistrationsCard />
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h5 className="mb-10 text-primary">
            Showing Search Result for "{searchTerm}"
          </h5>
          {searchResults.map((result: any) => (
            <Link to={`/mobile-app/${result.ID}`} key={result?.ID}>
              <div className=" py-2 px-6 border-b border-b-bodydark1 dark:border-b-boxdark hover:bg-bodydark hover:text-white">
                {result.LastName}, {result.FirstName} | {result.PIN}
              </div>
            </Link>
          ))}
        </Modal>
      )}
    </>
  );
};

export default MobileApp;

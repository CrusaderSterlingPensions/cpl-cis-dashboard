import { Link } from 'react-router-dom';
import UserIcon from '../../images/icon/UserIcon.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { capitalizeFirstLetter, formatDate } from '../../helper';

const RecentRegistrationsCard = () => {
  const [registrationsData, setRegistrationsData] = useState<any>([]);

  const getRecentRegistrations = async () => {
    try {
      const apiUrl = `http://132.10.100.221:9912/webservices/users/services/top10newpins`;
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const data = response.data;
        setRegistrationsData(data);
      } else {
        console.error(
          `Failed to fetch user results. Status: ${response.status}`,
        );
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    getRecentRegistrations();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Recent New Registrations
      </h4>

      <div>
        {registrationsData.map((item: any) => (
          <Link
            key={item.ID}
            to={`/mobile-app/${item.ID}`}
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
          >
            <div className="relative h-14 w-14 rounded-full">
              <img src={UserIcon} alt="User" />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {`${capitalizeFirstLetter(
                    item?.FirstName,
                  )} ${capitalizeFirstLetter(item?.LastName)}`}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {formatDate(item?.DateCreated)}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentRegistrationsCard;

import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';

const CardThreeMbl = () => {
  const [resultData, setResultdata] = useState<any>({});

  const fetchData = async () => {
    // Replace with your actual API endpoint
    const response = await fetch(
      'http://132.10.100.221:9912/webservices/users/daily-datarecapture-stat',
    );
    const result = await response.json();

    setResultdata(result);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white py-5 px-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <FaCamera className="text-primary dark:text-white" size={14} />
      </div>

      <div className="mt-4 px-2 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {resultData?.todayCount}
          </h4>
          <span className="text-xs font-medium">Daily Data Recapture</span>
        </div>

        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            parseInt(resultData?.percentageChange) < 0
              ? 'text-meta-1'
              : 'text-meta-3'
          }`}
        >
          <span className="flex flex-col justify-end items-end">
            <p>{`${resultData?.percentageChange}%`}</p>
            {/* <p className=" text-[10px] font-bold">Yesterday</p> */}
          </span>
          {parseInt(resultData?.percentageChange) > 0 ? (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          ) : (
            <svg
              className="fill-meta-1"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardThreeMbl;

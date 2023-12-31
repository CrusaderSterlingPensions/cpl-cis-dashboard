import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOneMbl: React.FC = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Logins',
        data: [],
      },
    ],
  });
  const [totals, setTotals] = useState<any>({
    dataRange: '',
    totalCount: '',
  });

  const [selectedPeriod, setSelectedPeriod] = useState<'hourly' | 'daily'>(
    'hourly',
  );

  const [options, setOptions] = useState<any>({
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#63131a', '#eda1a9'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#63131a', '#eda1a9'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
    },
  });

  const fetchData = async (period: 'hourly' | 'daily') => {
    try {
      const response = await fetch(
        `http://132.10.100.221:9912/webservices/users/time-series?period=${period}`,
      );
      const data = await response.json();

      setState({
        series: [
          {
            name: 'Logins',
            data: data.timeSeries.map((entry: any) => entry.count),
          },
        ],
      });

      setTotals({ dateRange: data.dateRange, totalCount: data.totalCount });

      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: data.timeSeries.map((entry: any) => entry.label),
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedPeriod);
  }, [selectedPeriod]);

  const handleButtonClick = (period: 'hourly' | 'daily') => {
    setSelectedPeriod(period);
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary text-sm">
                Total Logins: {totals.totalCount}
              </p>
              <p className="text-xs font-medium">{totals.dateRange}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                selectedPeriod === 'hourly'
                  ? 'bg-white shadow-card dark:bg-boxdark dark:text-white'
                  : ''
              }`}
              onClick={() => handleButtonClick('hourly')}
            >
              Hourly
            </button>
            <button
              className={`rounded  py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
                selectedPeriod === 'daily'
                  ? 'bg-white shadow-card dark:bg-boxdark dark:text-white'
                  : ''
              }`}
              onClick={() => handleButtonClick('daily')}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
            
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOneMbl;

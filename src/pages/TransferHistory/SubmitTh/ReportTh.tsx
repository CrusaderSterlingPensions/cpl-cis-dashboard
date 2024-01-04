import React from 'react';
import * as XLSX from 'xlsx';

const exportToExcel = (data: any) => {
  const currentDateTime = new Date().toISOString().replace(/[-:]/g, '');

  // Prepare the data for export
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

  // Save the workbook as an Excel file with the current date and time
  XLSX.writeFile(workbook, `submitth-report-${currentDateTime}.xlsx`);
};

const TableRow = ({ data }: any) => {
  const getStatusColor = (status: any) => {
    if (status instanceof Error) {
      return 'bg-danger bg-opacity-10';
    } else {
      return status === 'Paid'
        ? 'bg-success bg-opacity-10'
        : 'bg-danger bg-opacity-10';
    }
  };

  return (
    <tr>
      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">{data?.PIN}</h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{data?.transferRefId}</p>
      </td>
      <td
        className={`border-b border-[#eee] py-5 px-4 dark:border-strokedark ${getStatusColor(
          data?.status,
        )}`}
      >
        <p className="inline-flex rounded-full py-1 px-3 text-sm font-medium">
          {data?.status instanceof Error ? 'Error' : data?.status}
        </p>
      </td>
      {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          
        </div>
      </td> */}
    </tr>
  );
};

const ReportTh = ({ responseResults }: any) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Status Report
        </h2>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => exportToExcel(responseResults)}
        >
          Export to Excel
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                PIN
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Transfer Ref ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              {/* <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
            {responseResults.map((result: any, index: any) => (
              <TableRow key={index} data={result} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTh;

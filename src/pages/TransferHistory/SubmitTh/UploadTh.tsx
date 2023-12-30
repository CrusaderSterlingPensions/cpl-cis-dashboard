import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Breadcrumb from '../../../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReportTh from './ReportTh';

const UploadTh = () => {
  const location = useLocation();
  const credentials = location.state?.credentials;
  const [pins, setPins] = useState([]);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFilename] = useState<string>('');
  const [results, setResults] = useState<any>([]);
  const [responseResults, setResponseResults] = useState<any>([]);
  const navigate = useNavigate();

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const newPins: any = [];

      for (
        let i = 2;
        worksheet['!ref'] &&
        i <= parseInt(worksheet['!ref'].split(':')[1].slice(1), 10);
        i++
      ) {
        const pin = worksheet[`A${i}`]?.v;

        if (pin && /^PEN\d{12}$/.test(pin)) {
          newPins.push(pin);
        }
      }
      setPins(newPins);
      setFilename(file?.name);
      setFileSelected(true);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCancel = () => {
    setFileSelected(false);
    setPins([]);
    setFilename('');
    setResponseResults([]);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://132.10.100.221:9912/crusader/webservices/api/th/submit/get-data',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...credentials, pins }),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setResults(responseData);
        try {
          for (const data of responseData) {
            const pin = data?.thSummary?.rsapin;
            const transferRefId = data?.thSummary?.referenceId;

            try {
              const response = await axios.post(
                'http://132.10.100.221:9912/crusader/webservices/api/th/submitth',
                {
                  data: data,
                  userid: credentials?.userid,
                  password: credentials?.password,
                  token: credentials?.token,
                  quarter: credentials?.quarter,
                  transferRefId: transferRefId,
                  pin: pin,
                },
              );

              setResponseResults((prevResults: any) => [
                ...prevResults,
                {
                  ...response.data,
                },
              ]);
            } catch (error: any) {
              console.log('Error fetching from API', error);
              setResponseResults((prevResults: any) => [
                ...prevResults,
                {
                  PIN: pin,
                  transferRefId: transferRefId,
                  status: error?.message,
                },
              ]);
            }
          }
        } catch (error) {}
      } else {
        throw new Error('Request failed with status ' + response.status);
      }
    } catch (error) {
      console.error(error);
    }

    // navigate(`/mandate/pinComponent`, { replace: true });
  };

  console.log(responseResults);

  return (
    <>
      <Breadcrumb pageName="Submit Th" />
      <section>
        <div className="flex flex-col justify-center items-center bg-white dark:bg-black">
          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="flex flex-col items-center justify-center max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Upload PINS
              </h1>

              <div className="col-span-6 sm:col-span-3">
                {fileSelected ? (
                  <div className=" flex flex-col justify-center">
                    <p className=" text-center">
                      File Selected: {fileName} | {pins.length} pins
                    </p>
                    <button className=" text-danger" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h4 className="block text-sm font-medium text-gray-700 mb-6">
                      Upload Transfer Out Pins(Excel Only)
                    </h4>
                    {/* File Upload Start */}
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          XLSX (Excel file, workbook) only
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                      />
                    </label>
                    {/* File Upload End */}
                  </>
                )}

                {fileSelected && (
                  <div className="mt-8 col-span-6 sm:flex sm:items-center flex justify-center">
                    <button
                      onClick={handleOnSubmit}
                      className="inline-block shrink-0 rounded-md border border-graydark dark:border-white bg-graydark px-12 py-3 text-sm font-medium text-gray-2 hover:text-graydark dark:text-gray-400 transition hover:bg-transparent hover:text-gray-800 focus:outline-none focus:ring active:text-gray-800"
                    >
                      Start
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0"></p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </section>
      <section>
        {responseResults.length > 0 && (
          <ReportTh responseResults={responseResults} />
        )}
      </section>
    </>
  );
};

export default UploadTh;

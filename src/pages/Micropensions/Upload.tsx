import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Breadcrumb from '../../components/Breadcrumb';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Upload = () => {
  const location = useLocation();
  const token = location.state?.token;
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFilename] = useState<string>('');
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [jsonData, setJsonData] = useState<any>([]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (event: any) => {
      const data = new Uint8Array(event?.target?.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });

      const transformedData = jsonData.map((record: any) => ({
        pfaCode: String(record.PFACODE).padStart(3, '0'),
        rsaPin: `PEN${String(record['RSA PIN']).slice(-12)}`,
        firstName: record['FIRST NAME'],
        lastName: record['LAST NAME'],
        otherName: record['OTHER NAME'],
        fundId: String(record['FUND ID']).padStart(6, '0'),
        fundName: record['FUND NAME'],
        phoneNumber: String(record['PHONE NUMBER']).startsWith('0')
          ? String(record['PHONE NUMBER'])
          : `0${String(record['PHONE NUMBER'])}`,
      }));

      console.log(transformedData);

      setJsonData(transformedData);
      setFilename(file?.name);
      setFileSelected(true);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCancel = () => {
    // Clear the selected file and show the input area again
    setFileSelected(false);
    setFilename('');
  };

  const dispatchPin = async (data: any, token: any) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://132.10.100.221:9912/webservices/micropensions/save',
        {
          data,
          token,
        },
      );
      const responseData = response.data;

      setLoading(false);

      return responseData;
    } catch (error: any) {
      const errorResponse = error?.response?.data;
      setLoading(false);
      throw errorResponse;
    }
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await dispatchPin(jsonData, token);
      if (result.httpStatusCode === 200) {
        toast.success('Upload Successful', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // navigate(-1);
        console.log(result)
      }
    } catch (error: any) {
      if (error.status === 500) {
        toast.error(error.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate(-1);
      }
      if (error.status === 403) {
        toast.error(error.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate(-1);
      }
      if (error.httpStatus === 'INTERNAL_SERVER_ERROR') {
        toast.error(error.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        handleCancel();
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Pin Upload" />
      <section>
        <div className="flex flex-col justify-center items-center bg-white dark:bg-black">
          <main
            aria-label="Main"
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="flex flex-col items-center justify-center max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                MPC PIN Upload
              </h1>

              <div className="col-span-6 sm:col-span-3">
                {fileSelected ? (
                  <div className=" flex flex-col justify-center">
                    <p className=" text-center">File Selected: {fileName}</p>
                    <button className=" text-danger" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <h4 className="block text-sm font-medium text-gray-700 mb-6">
                      Upload Pins details(Excel Only)
                    </h4>
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
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          XLSX (Excel file, workbook) only
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".xlsx"
                      />
                    </label>
                  </>
                )}

                {fileSelected && (
                  <div className="mt-8 col-span-6 sm:flex sm:items-center flex justify-center">
                    <button
                      onClick={handleOnSubmit}
                      className="inline-block shrink-0 rounded-md border border-graydark dark:border-white bg-graydark px-12 py-3 text-sm font-medium text-gray-2 hover:text-graydark dark:text-gray-400 transition hover:bg-transparent hover:text-gray-800 focus:outline-none focus:ring active:text-gray-800"
                    >
                      {isLoading ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-3 animate-spin dark:text-gray fill-primary"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        'Upload PIN'
                      )}
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0"></p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Upload;

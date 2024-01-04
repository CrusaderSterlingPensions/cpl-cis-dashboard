import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumb';
import { FaSearch, FaUpload } from 'react-icons/fa';

const MandateStore = () => {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb pageName="Mandate Store" />
      <div className="flex flex-col justify-center bg-white dark:bg-black py-12">
        <div className="flex flex-col sm:flex-row sm:space-x-12">
          <div
            onClick={() => navigate('/mandate/search-mandate')}
            className="cursor-pointer w-full h-80 sm:w-1/2 flex flex-col justify-center items-center bg-white dark:bg-black hover:bg-secondary dark:hover:bg-gray rounded-lg"
          >
            <FaSearch className="w-40 h-40" />
            <h3 className="cursor-pointer mt-3 text-md font-medium text-gray-900 sm:text-3xl md:text-4xl text-center">
              Find Mandate
            </h3>
          </div>
          <div
            onClick={() => navigate('/mandate/upload-mandate')}
            className="w-full sm:w-1/2 flex flex-col justify-center items-center h-80 bg-white dark:bg-black hover:bg-secondary dark:hover:bg-gray rounded-lg"
          >
            <div className="flex flex-col justify-center items-center ">
              <main
                aria-label="Main"
                className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
              >
                <div className="flex flex-col items-center justify-center max-w-xl lg:max-w-3xl">
                  <div className="col-span-6 sm:col-span-3">
                    {/* File Upload Start */}
                    <label className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center">
                        <FaUpload className="w-40 h-40" />
                      </div>
                    </label>
                    <h3 className="cursor-pointer mt-3 font-medium text-gray-900 sm:text-3xl md:text-4xl text-center">
                      Upload Mandate
                    </h3>
                    {/* File Upload End */}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MandateStore;

import Breadcrumb from '../../components/Breadcrumb';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PinUpload = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  const authenticate = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://132.10.100.221:9912/webservices/micropensions/auth',
        {
          username,
          password,
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

  const handleSignIn = async (e: any) => {
    e.preventDefault();

    try {
      // Call the authenticate function to get the token
      const authCall = await authenticate(username, password);
      if (authCall.token) {
        toast.success('Successfully Signed In', {
          position: 'bottom-right',
          icon: <FaCheckCircle color="green" />,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/micropensions/pin-upload/save', {
          state: { token: authCall.token },
        });
      }
    } catch (error: any) {
      error.message === 'Unauthorized'
        ? toast.error(
            'Unauthorized: Check Username and Password and Try again',
            {
              position: 'top-right',
              autoClose: 5000, // Close the toast after 5 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            },
          )
        : toast.error('An Error Occured, Check Connection', {
            position: 'top-right',
            autoClose: 5000, // Close the toast after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Pin Upload" />

      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col gap-9 w-180">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sign In
              </h3>
            </div>
            {/* Signin page start */}
            <form onSubmit={handleSignIn}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Username
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Enter your Username"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex mt-16 w-full justify-center rounded bg-primary p-3 font-medium text-gray"
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
                    'Sign In'
                  )}
                </button>
              </div>
            </form>
            {/* Signin page end */}
          </div>

          {/* <!-- Sign Up Form --> */}
        </div>
      </div>
    </>
  );
};

export default PinUpload;

import { useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../../../components/Breadcrumb';

const SearchMandate = () => {
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  //   const [searchResult, setSearchResult] = useState([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pinValue = e.target.value;
    setPin(pinValue);
    setErrorMessage(null);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post<string>('url', { pin });
      console.log('Response:', response.data);
      setLoading(false);
    } catch (error) {
      console.error(
        'Error:',
        axios.isAxiosError(error) && error.response?.data,
      );
      setErrorMessage(axios.isAxiosError(error) && error.response?.data);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <>
      <Breadcrumb pageName="Search Mandate" />
      <div className="flex flex-col justify-center bg-white dark:bg-black py-12 p-4">
        <div className="w-full sm:w-1/2 mx-auto flex items-center">
          <div className="relative flex-grow">
            <input
              autoFocus
              placeholder="Search mandate"
              className="w-full px-4 py-3 outline-none border border-200 rounded-md"
              value={pin}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <div
              onClick={handleClick}
              className="absolute right-0 top-0 h-full flex items-center pr-4 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="30px"
                height="30px"
              >
                <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className='flex mt-4 w-full justify-center'>
        {loading && (
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
        )}
        </div>
        {errorMessage && (
          <div className="text-red-500 mt-2 text-center">{errorMessage}</div>
        )}
      </div>
    </>
  );
};

export default SearchMandate;

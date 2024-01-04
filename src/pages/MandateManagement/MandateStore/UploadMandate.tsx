import { useState, ChangeEvent } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { file } from 'jszip';

const UploadMandate = () => {
  const [pin, setPin] = useState<string>('');
  const [isValidPin, setIsValidPin] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
  const [filePreviews, setFilePreviews] = useState<
    { file: File; preview: string }[]
  >([]);

  const handlePinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPin = event.target.value;
    setPin(newPin);
    const pinRegex = /^PEN\d{12}$/;
    setIsValidPin(newPin === '' || pinRegex.test(newPin));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    const newFiles = Array.from(event.target.files || []);
    console.log(newFiles);
    console.log(files, '=================', newFiles);
    setFiles([...files, ...newFiles]);

    const newFilePreviews = newFiles.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });

    setFilePreviews([...filePreviews, ...newFilePreviews]);
    event.target.value = '';
  };

  console.log('this is files', files);
  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, idx) => index !== idx));
    setFilePreviews(filePreviews.filter((_, idx) => index !== idx));
  };

  // console.log(
  //   'this is set file',
  //   files,
  //   '\n this is set filepreview',
  //   filePreviews,
  // );

  return (
    <>
      <Breadcrumb pageName="Upload mandate" />
      <div className="flex flex-col justify-center bg-white dark:bg-black py-12 p-4">
        <div className="w-full sm:w-1/2 mb-10 mx-auto flex flex-col justify-center">
          <label className="font-bold text-lg mb-3">PIN</label>
          {!isValidPin && pin !== '' && (
            <p className="text-primary">Invalid pin</p>
          )}
          <input
            autoFocus
            placeholder="Enter pin"
            className={`p-5 outline-none border rounded-md font-bold ${
              !isValidPin && pin !== '' ? 'border-primary' : 'border-gray-300'
            }`}
            required
            onChange={handlePinChange}
          />
        </div>
        <div className="w-full sm:w-1/2 mb-10 mx-auto flex flex-col justify-center">
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
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPEG, PDF, PNG, HTML, XML
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".jpeg, .jpg, .png, .pdf, .html, .xml"
              onChange={handleFileChange}
              multiple
            />
          </label>
          {filePreviews.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold text-lg">Uploaded Files:</h3>
              <ul className="flex flex-col space-x-4 mt-2">
                {filePreviews.map((filePreview, index) => (
                  <li key={index} className="flex items-center justify-between">
                    {filePreview.file.type.startsWith('image/') ? (
                      <img
                        src={filePreview.preview}
                        alt={filePreview.file.name}
                        className="max-h-20"
                      />
                    ) : (
                      <p>{filePreview.file.name}</p>
                    )}
                    <div
                      onClick={() => handleRemoveFile(index)}
                      className="cursor-pointer ml-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 30 30"
                      >
                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          className={`w-1/2 mt-10 mx-auto inline-block shrink-0 rounded-md border ${
            isValidPin && files.length > 0
              ? 'border-graydark dark:border-white bg-graydark hover:text-graydark dark:text-gray-400 transition hover:bg-transparent hover:text-gray-800'
              : 'border-gray-400 bg-gray-200 cursor-not-allowed'
          } px-12 py-3 text-sm font-medium text-gray-2`}
          disabled={!isValidPin || files.length === 0}
        >
          Upload Mandate
        </button>
      </div>
    </>
  );
};

export default UploadMandate;

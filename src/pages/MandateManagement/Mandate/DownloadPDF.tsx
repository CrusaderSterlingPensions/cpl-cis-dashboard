function DownloadPDF({ onClick }: any) {
  return (
    <div className="grid h-screen px-4 bg-red-50 place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-300 text-9xl">Success!</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Your Mandate Generation is completed
        </p>

        <p className="mt-4 text-gray-500">
          Click Download button to download zipped PDF of the Mandates
        </p>
        <button
          className="inline-block px-5 py-3 mt-6 text-sm font-bold text-white dark:text-white bg-black dark:bg-black-2 rounded dark:hover:bg-black hover:bg-bodydark2 hover:font-bold focus:outline-none focus:ring"
          onClick={onClick}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default DownloadPDF;

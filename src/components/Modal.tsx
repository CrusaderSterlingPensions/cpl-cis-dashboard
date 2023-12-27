const Modal = ({ children, onClose }: any) => {
  return (
    <div className="fixed inset-0 z-999999 overflow-auto bg-black dark:bg-black-2 dark:bg-opacity-75 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white max-h-[90vh] dark:bg-black p-6 max-w-xl mx-auto rounded-lg shadow-lg lg:w-3/5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

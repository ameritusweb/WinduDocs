import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useConsoleToasts = () => {
  useEffect(() => {
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    console.warn = (...args) => {
      originalConsoleWarn(...args);
      toast.warn(args.join(' '));
    };

    console.error = (...args) => {
      originalConsoleError(...args);
      toast.error(args.join(' '));
    };

    return () => {
      console.log = originalConsoleWarn;
      console.error = originalConsoleError;
    };
  }, []);
};

export default useConsoleToasts;

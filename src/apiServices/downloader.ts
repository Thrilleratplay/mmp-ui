import backendAxiosInstance from './axios';

/**
 * 
 * @returns 
 */
const useDownloader = () => (
  (data: unknown) => (
    backendAxiosInstance.post('downloader/fetch', data)
  )
);

export {
    useDownloader,
}
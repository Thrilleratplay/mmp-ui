import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Printer } from '@/printers/entities/Printer';
import backendAxiosInstance from './axios';

/**
 * 
 * @returns 
 */
const useGetPrinters = () => (
  useQuery<Printer[]>({
    queryKey: ['GetPrinters'],
    queryFn: async () => await backendAxiosInstance.get('/printers'),
  })
);

/**
 * 
 * @returns 
 */
const useGetPrinter = (printerUuid: string) => (
  useQuery<Printer>({
    queryKey: [`GetPrinters-${printerUuid}`],
    queryFn: async () => await backendAxiosInstance.get(`/printers${printerUuid}`),
  })
);

/**
 * 
 * @returns 
 */
const useSendToPrinter = () => (
  (printerUuid: string, assetId: string) => (
    backendAxiosInstance.get(`/printers/${printerUuid}/send/${assetId}`)
  )
);

/**
 * 
 * @returns 
 */
const usePostTestPrinters = () => (
  (data: unknown) => backendAxiosInstance.post('/printers/test', data)
);

/**
 * 
 * @returns 
 */
const usePostSavePrinter = () => {
    const queryClient = useQueryClient();

    return (printerUuid: string|undefined, data: unknown) => (
        backendAxiosInstance.post(`/printers${printerUuid ? '/' + printerUuid : ''}`, data)
        .then((response) => {
          queryClient.invalidateQueries({ queryKey: ['GetPrinters']});
          return response;
        })
        .catch((response) => {
          queryClient.invalidateQueries({ queryKey: ['GetPrinters']});
          return response;
        })
    )
}

/**
 * 
 * @returns 
 */
const useDeletePrinter = () => {
    const queryClient = useQueryClient();

    return (printerUuid: string) => (
        backendAxiosInstance.post(`/printers/${printerUuid}/delete`)
        .then((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetPrinters']});
          return data;
        })
        .catch((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetPrinters']});
          return data;
        })
    )
}

export {
  useGetPrinters,
  useGetPrinter,
  usePostTestPrinters,
  usePostSavePrinter,
  useDeletePrinter,
  useSendToPrinter,
};
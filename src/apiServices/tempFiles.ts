import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TempFile } from '@/tempfiles/entities/TempFile';
import backendAxiosInstance from './axios';

/**
 * 
 * @returns 
 */
const useGetTempFiles = () => (
  useQuery<TempFile[]>({
    queryKey: ['GetTempFiles'],
    queryFn: async () => await backendAxiosInstance.get('/tempfiles'),
  })
);

/**
 * 
 * @returns 
 */
const usePostTempFile = () => {
    const queryClient = useQueryClient();

    return (tempfileUuid: string|undefined, data: unknown,) => (
        backendAxiosInstance.post(`/tempfiles${tempfileUuid ? '/' + tempfileUuid : ''}`, data)
        .then((response) => {
          queryClient.invalidateQueries({ queryKey: ['GetTempFiles']});
          return response;
        })
        .catch((response) => {
          queryClient.invalidateQueries({ queryKey: ['GetTempFiles']});
          return response;
        })
    )
}

/**
 * 
 * @returns 
 */
const useDeleteTempFile = () => {
    const queryClient = useQueryClient();

    return (tempfileUuid: string) => (
        backendAxiosInstance.post(`/tempfiles/${tempfileUuid}/delete`)
        .then((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetTempFiles']});
          return data;
        })
        .catch((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetTempFiles']});
          return data;
        })
    )
}

export {
  usePostTempFile,
  useDeleteTempFile,
  useGetTempFiles,
};
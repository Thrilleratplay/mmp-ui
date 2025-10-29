import { useQuery, useQueryClient } from '@tanstack/react-query';
import backendAxiosInstance from './axios';
import { AgentSettings } from "@/settings/entities/AgentSettings";

const useGetPaths = () => (
  useQuery<string[]>({
    queryKey: ['GetPaths'],
    queryFn: async () => {
      return await backendAxiosInstance.get('/system/paths');
    },
  })
);

const useGetSettings = () => (
  useQuery<AgentSettings>({
    queryKey: ['GetSettings'],
    queryFn: async () => {
      return await backendAxiosInstance.get('/system/settings');
    },
  })
);

const useGetDiscovery = (enabled: boolean = false) => (
  useQuery({
    queryKey: ['GetDiscovery'],
    queryFn: async () => {
      return await backendAxiosInstance.get('/system/discovery');
    },
    enabled,
  })
);

const usePostSettings = () => {
  const queryClient = useQueryClient();

  return (data: unknown) => (
      backendAxiosInstance.post('/system/settings', data) 
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ['GetSettings']});
        return data;
      })
      .catch((data) => {
        queryClient.invalidateQueries({ queryKey: ['GetSettings']});
        return data;
      })
  )
};

export {
    useGetPaths,
    useGetSettings,
    useGetDiscovery,
    usePostSettings,
}
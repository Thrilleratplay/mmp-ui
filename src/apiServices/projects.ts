// import { Asset } from "@/assets/entities/Assets";
import { Project } from '@/projects/entities/Project';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import backendAxiosInstance from './axios';

const useGetProjects = () => (
  useQuery<Project[]>({
    queryKey: ['GetProjects'],
    queryFn: async () => {
      return await backendAxiosInstance.get('/projects');
    },
  })
);

const useGetProjectsList = () => (
  useQuery<Project[]>({
    queryKey: ['GetProjectsList'],
    queryFn: async () => {
      return await backendAxiosInstance.get('/projects/lists');
    },
  })
);

const useDiscoverProject = (projectUuid: string, enabled: boolean = false) => (
  useQuery<Project[]>({
    queryKey: [`GetProjectDiscover$${projectUuid}`],
    queryFn: async () => {
      return await backendAxiosInstance.get(`projects/${projectUuid}/discover`);
    },
    enabled,
  })
);


const usePostProject = () => {
  const queryClient = useQueryClient();

  return (projectUuid: string, data: unknown) => (
      backendAxiosInstance.post(`/projects${projectUuid ? "/" + projectUuid: ''}`, data) 
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ['GetProjects']});
        return data;
      })
      .catch((data) => {
        queryClient.invalidateQueries({ queryKey: ['GetProjects']});
        return data;
      })
  )
};


const useMoveProject = () => {
    const queryClient = useQueryClient();

    return (projectUuid: string, data: unknown) => (
        backendAxiosInstance.post(`/projects/${projectUuid}`, data)
        .then((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetProjects']});
          return data;
        })
        .catch((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetProjects']});
          return data;
        })
    )
}

const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return (projectUuid: string) => (
        backendAxiosInstance.post(`/projects/${projectUuid}`)
        .then((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetProjects']});
          return data;
        })
        .catch((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetProjects']});
          return data;
        })
    )
}

const usePostProjectAsset = () => {
  const queryClient = useQueryClient();

  return (projectUuid: string, data: unknown) => (
      backendAxiosInstance.post(`/projects${projectUuid}/assets`, data) 
      .then((data) => {
        queryClient.invalidateQueries({ queryKey: ['GetProjects']});
        return data;
      })
      .catch((data) => {
        queryClient.invalidateQueries({ queryKey: ['GetProjects']});
        return data;
      })
  )
};

const useDeleteProjectAsset = () => {
    const queryClient = useQueryClient();

    return (projectUuid: string, assetId: string) => (
        backendAxiosInstance.post(`/projects/${projectUuid}/assets/${assetId}/delete`)
        .then((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetProjects']});
          return data;
        })
        .catch((data) => {
          queryClient.invalidateQueries({ queryKey: ['GetProjects']});
          return data;
        })
    )
}

const useSetMainImage = () => (
    (projectUuid: string, assetId: string) => (
        backendAxiosInstance.post(`projects/${projectUuid}/image`, {
                uuid: projectUuid,
                default_image_id: assetId
            })
    )
);

export {
    useGetProjects,
    usePostProject,
    useDeleteProject,
    useDiscoverProject,
    usePostProjectAsset,
    useDeleteProjectAsset,
    useMoveProject,
    useSetMainImage,
    useGetProjectsList,
};
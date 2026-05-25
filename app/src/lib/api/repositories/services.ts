import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '../methods';
import type { Repository } from './types';

const repositoryQueryKeys = {
    all: ['github-repositories'] as const,
    byUsername: (username: string) => [...repositoryQueryKeys.all, 'user', username] as const,
    byFullName: (fullName: string) => [...repositoryQueryKeys.all, 'detail', fullName] as const,
};

const getUserRepositories = async (username: string): Promise<Repository[]> => {
    return get<Repository[]>(`/users/${username}/repos`);
};

const getRepositoryDetails = async (fullName: string): Promise<Repository> => {
    return get<Repository>(`/repos/${fullName}`);
};

type UseUserRepositoriesOptions = Omit<
    UseQueryOptions<
        Repository[],
        Error,
        Repository[],
        ReturnType<typeof repositoryQueryKeys.byUsername>
    >,
    'queryKey' | 'queryFn'
>;

type UseRepositoryDetailsOptions = Omit<
    UseQueryOptions<Repository, Error, Repository, ReturnType<typeof repositoryQueryKeys.byFullName>>,
    'queryKey' | 'queryFn'
>;

const useGetUserRepositories = (username: string, options?: UseUserRepositoriesOptions) => {
    return useQuery({
        queryKey: repositoryQueryKeys.byUsername(username),
        queryFn: () => getUserRepositories(username),
        enabled: Boolean(username) && (options?.enabled ?? true),
        ...options,
    });
};

const useGetRepositoryDetails = (fullName: string, options?: UseRepositoryDetailsOptions) => {
    return useQuery({
        queryKey: repositoryQueryKeys.byFullName(fullName),
        queryFn: () => getRepositoryDetails(fullName),
        enabled: Boolean(fullName) && (options?.enabled ?? true),
        ...options,
    });
};

export const repositoriesFacade = {
    queryKeys: repositoryQueryKeys,
    getUserRepositories,
    getRepositoryDetails,
    useGetUserRepositories,
    useGetRepositoryDetails,
};

export {
    getRepositoryDetails,
    getUserRepositories,
    repositoryQueryKeys,
    useGetRepositoryDetails,
    useGetUserRepositories,
};

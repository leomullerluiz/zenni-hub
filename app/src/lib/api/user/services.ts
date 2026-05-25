import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { get } from '../methods';
import type { User } from './types';

const userQueryKeys = {
    all: ['github-user'] as const,
    byUsername: (username: string) => [...userQueryKeys.all, username] as const,
};

const getGithubUser = async (username: string): Promise<User> => {
    return get<User>(`/users/${username}`);
};

type UseUserOptions = Omit<
    UseQueryOptions<User, Error, User, ReturnType<typeof userQueryKeys.byUsername>>,
    'queryKey' | 'queryFn'
>;

const useGetGithubUser = (username: string, options?: UseUserOptions) => {
    return useQuery({
        queryKey: userQueryKeys.byUsername(username),
        queryFn: () => getGithubUser(username),
        enabled: Boolean(username) && (options?.enabled ?? true),
        ...options,
    });
};

export const userFacade = {
    queryKeys: userQueryKeys,
    getGithubUser,
    useGetGithubUser,
};

export { getGithubUser, useGetGithubUser, userQueryKeys };

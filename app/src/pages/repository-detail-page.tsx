'use client';

import Link from 'next/link';

import { Button } from '@/app/src/components/ui/button';
import { useGetRepositoryDetails } from '@/app/src/lib/api/repositories/services';

type RepositoryDetailPageProps = {
    owner: string;
    repository: string;
};

export function RepositoryDetailPage({ owner, repository }: RepositoryDetailPageProps) {
    const fullName = `${owner}/${repository}`;
    const { data: repositoryDetails, isFetching, isError, error } = useGetRepositoryDetails(fullName);

    return (
        <section className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-6 py-12 dark:bg-black">
            <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="font-heading text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Detalhes do repositório</h1>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{fullName}</p>
                    </div>

                    <Button asChild variant="outline" size="sm">
                        <Link href="/">Voltar</Link>
                    </Button>
                </div>

                {isFetching && <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">Carregando repositorio...</p>}

                {isError && (
                    <p className="mt-6 text-sm text-red-600 dark:text-red-400">{error.message || 'Nao foi possivel carregar o repositorio.'}</p>
                )}

                {repositoryDetails && (
                    <div className="mt-6 space-y-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                        <div>
                            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{repositoryDetails.name}</p>
                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{repositoryDetails.description || 'Sem descrição disponível.'}</p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/40">
                                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Stars</p>
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{repositoryDetails.stargazers_count}</p>
                            </div>
                            <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/40">
                                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Linguagem</p>
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{repositoryDetails.language || 'Nao informada'}</p>
                            </div>
                            <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/40">
                                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Visibilidade</p>
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{repositoryDetails.visibility}</p>
                            </div>
                        </div>

                        <a
                            href={repositoryDetails.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                            Abrir no GitHub
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
}

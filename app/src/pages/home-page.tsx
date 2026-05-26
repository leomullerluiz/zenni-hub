
'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/src/components/ui/accordion';
import { Button } from '@/app/src/components/ui/button';
import { Input } from '@/app/src/components/ui/input';
import { useGetUserRepositories } from '@/app/src/lib/api/repositories/services';
import { useGetGithubUser } from '@/app/src/lib/api/user/services';

export function HomePage() {
    const [usernameInput, setUsernameInput] = useState('');
    const [usernameToSearch, setUsernameToSearch] = useState('');
    const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

    const { data: user, isFetching, isError, error } = useGetGithubUser(usernameToSearch);
    const {
        data: repositories,
        isFetching: isFetchingRepositories,
        isError: isRepositoriesError,
        error: repositoriesError,
    } = useGetUserRepositories(user?.login ?? '');

    const sortedRepositories = repositories
        ? [...repositories].sort((leftRepository, rightRepository) => {
            const starDiff = rightRepository.stargazers_count - leftRepository.stargazers_count;

            return sortDirection === 'desc' ? starDiff : starDiff * -1;
        })
        : [];

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUsernameToSearch(usernameInput.trim());
    };

    return (
        <section className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-6 py-12 dark:bg-black">
            <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <h1 className="font-heading text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Zenni Hub</h1>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Busque um usuario do GitHub para disparar a request.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
                    <Input
                        value={usernameInput}
                        onChange={(event) => setUsernameInput(event.target.value)}
                        placeholder="Digite o username (ex: leomullerluiz)"
                        aria-label="GitHub username"
                    />
                    <Button type="submit" disabled={!usernameInput.trim() || isFetching}>
                        {isFetching ? 'Buscando...' : 'Buscar'}
                    </Button>
                </form>

                {isError && (
                    <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                        {error.message || 'Nao foi possivel buscar o usuario.'}
                    </p>
                )}

                {user && (
                    <div className="mt-6 space-y-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            <img
                                src={user.avatar_url}
                                alt={`Avatar de ${user.login}`}
                                className="h-20 w-20 rounded-2xl border border-zinc-200 object-cover dark:border-zinc-800"
                            />

                            <div className="min-w-0 flex-1">
                                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{user.name || user.login}</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">@{user.login}</p>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/40">
                                        <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Seguidores</p>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.followers}</p>
                                    </div>
                                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/40">
                                        <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Seguindo</p>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.following}</p>
                                    </div>
                                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/40">
                                        <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Email</p>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {user.email || 'Nao informado'}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/40">
                                        <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Repositorios publicos</p>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.public_repos}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{user.bio || 'Sem bio informada.'}</p>
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Ver perfil no GitHub
                                </a>
                            </div>
                        </div>

                        <div className="rounded-lg border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Repositorios publicos</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {isFetchingRepositories
                                            ? 'Carregando repositorios...'
                                            : `${repositories?.length ?? 0} repositorio(s) encontrado(s)`}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                        Ordenar
                                    </span>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSortDirection((currentDirection) => (currentDirection === 'desc' ? 'asc' : 'desc'))}
                                    >
                                        {sortDirection === 'desc' ? 'Maior para menor' : 'Menor para maior'}
                                    </Button>
                                </div>
                            </div>

                            {isRepositoriesError && (
                                <p className="mt-3 text-sm text-red-600 dark:text-red-400">
                                    {repositoriesError.message || 'Nao foi possivel carregar os repositorios.'}
                                </p>
                            )}

                            {!isRepositoriesError && sortedRepositories.length > 0 ? (
                                <Accordion type="single" collapsible className="mt-4">
                                    {sortedRepositories.map((repository) => (
                                        <AccordionItem key={repository.id} value={repository.full_name}>
                                            <AccordionTrigger>{repository.name}</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                                                    <p>{repository.description || 'Sem descricao disponível.'}</p>
                                                    <div className="flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                                                        <span>{repository.language || 'Linguagem nao informada'}</span>
                                                        <span>{repository.stargazers_count} estrelas</span>
                                                        <span>{repository.forks_count} forks</span>
                                                    </div>
                                                    <Link
                                                        href={`/repos/${encodeURIComponent(repository.owner.login)}/${encodeURIComponent(repository.name)}`}
                                                        className="inline-block font-medium text-blue-600 hover:underline dark:text-blue-400"
                                                    >
                                                        Ver detalhes do repositorio
                                                    </Link><br />
                                                    <a
                                                        href={repository.html_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-block font-medium text-blue-600 hover:underline dark:text-blue-400"
                                                    >
                                                        Abrir repositorio
                                                    </a>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                !isFetchingRepositories && (
                                    <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                                        Nenhum repositorio publico encontrado.
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

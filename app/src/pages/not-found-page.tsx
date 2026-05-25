type NotFoundPageProps = {
    path: string;
};

export function NotFoundPage({ path }: NotFoundPageProps) {
    return (
        <section className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-6 py-12 dark:bg-black">
            <div className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <h1 className="font-heading text-3xl font-semibold text-zinc-900 dark:text-zinc-100">Erro 404</h1>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Pagina "{path}" nao foi encontrada</p>
            </div>
        </section>
    );
}

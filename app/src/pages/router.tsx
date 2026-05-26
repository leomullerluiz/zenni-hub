import type { ReactElement } from "react";
import { HomePage } from "@/app/src/pages/home-page";
import { NotFoundPage } from "@/app/src/pages/not-found-page";
import { RepositoryDetailPage } from "./repository-detail-page";

type PageComponent = () => ReactElement;

const pageRoutes: Record<string, PageComponent> = {
    "/": HomePage,
};

function normalizePath(path: string) {
    if (path === "/") {
        return path;
    }

    return path.replace(/\/+$/, "");
}

export function resolvePageByPath(path: string) {
    const normalizedPath = normalizePath(path);

    const repositoryDetailMatch = normalizedPath.match(/^\/repos\/([^/]+)\/([^/]+)$/);
    if (repositoryDetailMatch) {
        const [, owner, repository] = repositoryDetailMatch;
        return <RepositoryDetailPage owner={decodeURIComponent(owner)} repository={decodeURIComponent(repository)} />;
    }

    const Page = pageRoutes[normalizedPath];

    if (!Page) {
        return <NotFoundPage path={normalizedPath} />;
    }

    return <Page />;
}

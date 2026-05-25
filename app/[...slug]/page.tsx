import { resolvePageByPath } from "@/app/src/pages/router";

type CatchAllPageProps = {
    params: Promise<{ slug: string[] }>;
};

export default async function CatchAllPage({ params }: CatchAllPageProps) {
    const { slug } = await params;
    const path = `/${slug.join("/")}`;

    return resolvePageByPath(path);
}

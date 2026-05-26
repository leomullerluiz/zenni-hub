# Zenni Hub

Zenni Hub é uma aplicação em Next.js para buscar usuários do GitHub, visualizar detalhes do perfil e explorar os repositórios públicos com ordenação por estrelas. Cada repositório também leva para uma página interna de detalhes e para o link oficial no GitHub.

## Acesso online

A aplicação publicada está disponível em:

https://zenni-pkzygavpe-leomullerluizs-projects.vercel.app/

## Funcionalidades

- Busca de usuários do GitHub por username.
- Exibição de avatar, nome, seguidores, seguidos, e-mail e bio.
- Listagem de repositórios públicos com ordenação por estrelas.
- Página interna com detalhes do repositório selecionado.
- Link externo para abrir o repositório no GitHub.

## Stack

- Next.js
- React
- TypeScript
- TanStack Query
- Axios
- Tailwind CSS
- Radix UI

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Configure a variável de ambiente em um arquivo `.env`:

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.github.com
```

3. Inicie o projeto:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

- `npm run dev` - inicia o ambiente de desenvolvimento.
- `npm run build` - gera a build de produção.
- `npm run start` - executa a build de produção.
- `npm run lint` - executa o ESLint.

## Observações

O projeto consome a API pública do GitHub. Se a variável `NEXT_PUBLIC_API_BASE_URL` não estiver configurada corretamente, as buscas não irão funcionar.

# DescomplicaVetMT

Site em React, TypeScript, TanStack Start e Tailwind CSS, preparado para Cloudflare Workers com arquivos estáticos. O código ativo e as imagens não dependem do Lovable.

## Executar localmente

Requisitos: Node.js 22.12 ou superior e Bun 1.4.2 ou superior. Use o `bun.lock` versionado para reproduzir as versões verificadas.

```sh
bun install --frozen-lockfile
bun run cf-typegen
bun run dev
```

Para validar a versão de produção:

```sh
bun run build
bun run preview
```

O plugin oficial do Cloudflare executa o Worker no runtime local. Nenhum banco de dados, token, segredo ou conta do Lovable é necessário para o aplicativo atual.

## Verificar a preparação

```sh
bun run verify
```

A verificação confere independência do código, integridade das imagens, build, tipos, lint, auditoria de dependências, respostas HTTP no runtime local e `wrangler deploy --dry-run`. Ela consulta o registro de vulnerabilidades; não publica o site. Precisa da porta local 4175 livre. Evidências ficam em `docs/preparacao-cloudflare/`.

Comandos individuais: `bun run lint`, `bun run typecheck` e, após o build, `bun run deploy:dry-run`.

## Imagens e serviços externos

As quatro imagens originais estão em `public/images/`; os hashes SHA-256, dimensões e endereços de origem estão em `docs/preparacao-cloudflare/imagens-recuperadas.json`. O site usa somente as cópias locais. `scripts/recover-assets.mjs` registra o processo de recuperação e pode tentar baixar novamente os originais enquanto os endereços antigos existirem; não faz parte do build ou da execução do site.

Google Fonts, WhatsApp (`wa.link`), Instagram e checkout Kiwify continuam externos. Os links de atendimento e compra foram preservados. Nenhum formulário, autenticação, banco de dados, pagamento interno ou API de negócio foi identificado no código exportado.

## Publicação

O Worker foi publicado em [descomplicavetmt.studiocriandoweb.workers.dev](https://descomplicavetmt.studiocriandoweb.workers.dev). A zona DNS está ativa e os domínios `descomplicavetmt.com.br` e `www.descomplicavetmt.com.br` estão associados ao Worker. Veja [a publicação e o estado da transferência](docs/preparacao-cloudflare/PUBLICACAO.md), incluindo a validação do tráfego após a desconexão do domínio no Lovable.

Leia [o resultado e o roteiro de transferência](docs/preparacao-cloudflare/RESULTADO.md). A configuração de origem é `wrangler.jsonc`; o build gera `dist/server/wrangler.json` e `dist/client/`. Publique o Worker e os arquivos estáticos juntos, pelo Wrangler, depois da autorização de acesso à conta e publicação. Enviar somente `dist/client` perde as rotas renderizadas no servidor e o sitemap.

O Worker se chama `descomplicavetmt`, na conta `studiocriandoweb@gmail.com`. Os dois domínios de produção estão declarados em `wrangler.jsonc` com `custom_domain: true`; preserve essa configuração nas próximas publicações. Para conferir a versão pública, use `node scripts/verify-public-worker.mjs https://descomplicavetmt.com.br` e repita com `https://www.descomplicavetmt.com.br`. O endereço `workers.dev` também aceita a mesma verificação.

## Backups e histórico

O código é versionado em [Ian-Almeidaa/DescomplicaVet](https://github.com/Ian-Almeidaa/DescomplicaVet), na branch `main`. Para atualizações, crie uma branch, faça as alterações, execute as verificações locais e envie os commits normalmente. Evite force push. Este envio ao GitHub não configura publicação automática no Cloudflare.

`docs/auditoria-cloudflare/` descreve o export original, antes das correções. A validação atual está em `docs/preparacao-cloudflare/` e em `GATES.md`.

Os relatórios JSON gerados pelos testes locais e o transcript de publicação são ignorados pelo Git; `bun run verify` gera novas evidências nesta máquina. O registro de procedência `imagens-recuperadas.json` acompanha as quatro imagens no repositório.

Nesta máquina, `.migration-backup/` contém o código/configuração originais, os componentes de UI sem uso e os metadados/scripts antigos. Esse backup não entra no Git nem na publicação. Guarde uma cópia antes de apagar a pasta de trabalho. O histórico de um repositório conectado ao Lovable deve ser preservado; a desvinculação desse serviço é uma etapa posterior.

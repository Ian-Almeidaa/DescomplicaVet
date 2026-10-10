# Worker publicado

Publicação autorizada pelo usuário e concluída em 10/10/2026.

- URL: https://descomplicavetmt.studiocriandoweb.workers.dev
- Worker: `descomplicavetmt`
- Conta: `studiocriandoweb@gmail.com` (`d83f93d98b206993dacf24d563578716`)
- Versão publicada: `6029a47d-59e5-416c-97aa-3c87f5559cb2`
- Deployment: `0e5d34be-9952-4938-a957-c1fd90b0dada`, com 100% do tráfego da URL do Worker.
- Horário indicado pela API: `2026-10-10T05:25:51.701329Z` — 01:25 em Cuiabá.

## Validação

O build foi refeito e a geração de tipos, o TypeScript e o ESLint passaram. Independência, integridade das imagens e empacotamento dry-run também foram conferidos antes do envio. O Wrangler publicou o código do servidor e os arquivos estáticos juntos; o registro do comando está em `publicacao-worker.txt`.

`scripts/verify-public-worker.mjs` passou contra a URL pública em HTTPS. A evidência está em `publico-descomplicavetmt.studiocriandoweb.workers.dev.json` e inclui:

- Home e política de privacidade com status 200; rota inexistente com 404.
- Sitemap XML, robots e favicon disponíveis.
- Quatro imagens com status 200 e SHA-256 idêntico aos originais locais.
- CSS e JavaScript referenciados pela home disponíveis.
- CSP e nonces correspondentes nos scripts, nonce diferente em nova resposta, HSTS, bloqueio de enquadramento, nosniff e HTML sem cache.
- HEAD da home sem corpo.

O navegador conectado continuou indisponível nesta sessão. Layout, interações e console ainda precisam de revisão visual pelo usuário no endereço público; os testes acima são verificações HTTP e de conteúdo.

## Autenticação

Wrangler autenticado na conta correta por OAuth. As credenciais ficam criptografadas fora do repositório, com a chave no Windows Credential Manager. Foram solicitados os escopos `account:read`, `user:read`, `workers_scripts:write`, `workers_routes:write`, `zone:read`, `ssl_certs:write` e o refresh `offline_access`. Nenhum token foi incluído em código, documento ou chat.

A conexão MCP anterior continua sendo usada para consultas de leitura; o upload foi feito com o Wrangler autorizado. O login não altera os outros Workers existentes na conta.

## Domínios associados ao Worker

O Registro.br e os resolvedores públicos Google e Cloudflare confirmaram a delegação para o Cloudflare em 10/10/2026. A zona foi ativada às 03:25 de Cuiabá (`2026-10-10T07:25:49.401450Z`).

Os dois registros A antigos para `185.158.133.1` foram removidos pelo usuário. Em seguida, `wrangler triggers deploy` associou o domínio principal e o `www` ao Worker existente, sem trocar sua versão de código. A configuração de origem `wrangler.jsonc` contém os dois Custom Domains e o build foi refeito; tipos, TypeScript e ESLint passaram.

Os nameservers atribuídos pelo Cloudflare continuam sendo:

```text
mike.ns.cloudflare.com
nena.ns.cloudflare.com
```

O Cloudflare confirmou os dois vínculos habilitados em produção:

- `descomplicavetmt.com.br` → `descomplicavetmt`, vínculo `0d616e2280fe85d6354e8961bbd4f41b11a7259f`.
- `www.descomplicavetmt.com.br` → `descomplicavetmt`, vínculo `a62b9a4bb856f6f3b69e464971da6c835bf568ae`.
- DNS gerenciado pelo Worker: registros AAAA para `100::`, sem apontamento para o Lovable. Esse endereço é o marcador usado pelo Cloudflare para uma origem sem servidor externo; preserve os registros gerenciados.

### Validação do tráfego

Às 03:42 de Cuiabá, `scripts/verify-public-worker.mjs` passou no `www`: páginas, sitemap, arquivos estáticos, quatro imagens com SHA-256 original, HTTPS, CSP/nonce, demais cabeçalhos e HEAD. O endereço `workers.dev` também passou.

O domínio principal ainda entregou a publicação antiga do Lovable, apesar do vínculo correto no Cloudflare. A causa provável é a precedência do vínculo SaaS antigo; a [documentação de prioridade de hostname](https://developers.cloudflare.com/ssl/reference/certificate-and-hostname-priority/#hostname-priority) descreve esse comportamento. O usuário foi orientado a desconectar apenas o domínio em Project → Settings → Domains no Lovable, mantendo o projeto salvo. **A transferência do tráfego principal permanece pendente até o teste passar após a desconexão.**

O certificado Universal SSL da zona está ativo; os certificados avançados emitidos para os Custom Domains estavam em provisionamento. DNSSEC continua desativado e as consultas públicas não encontraram DS antigo. Reativar DNSSEC com a chave do Cloudflare é uma etapa posterior à estabilização da transferência.

`CONEXAO-DNS.md` registra o diagnóstico histórico anterior à publicação. A integração de publicação automática com GitHub ainda não foi configurada. Consulte também [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

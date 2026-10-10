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

## Domínio principal: transferência ainda em andamento

O usuário informou que já alterou os servidores DNS no Registro.br. Após a publicação, a API Cloudflare ainda retornava a zona `descomplicavetmt.com.br` como `pending`, sem Custom Domain associado ao Worker.

Nas consultas públicas registradas em `dns-pos-publicacao.json`, os resolvedores 1.1.1.1 e 8.8.8.8 ainda retornaram `a.sec.dns.br` e `b.sec.dns.br`, e o IP do Lovable `185.158.133.1`. O DS antigo ainda apareceu em 1.1.1.1, enquanto 8.8.8.8 já retornou ausência de DS. A consulta técnica RDAP posterior, em `registro-pos-publicacao.json`, confirmou `delegationSigned: false` e alteração do registro às 01:22 de Cuiabá, ainda com os nameservers antigos. Portanto, a retirada da assinatura anterior foi aplicada no registro, mas a delegação para os nameservers Cloudflare ainda não foi observada.

Os nameservers atribuídos pelo Cloudflare continuam sendo:

```text
mike.ns.cloudflare.com
nena.ns.cloudflare.com
```

Nenhum apontamento DNS foi alterado pelo agente nesta etapa. O Worker está independente e público em `workers.dev`; **o domínio principal ainda não foi comprovado servindo este Worker**.

Próxima ação: confirmar a ativação da zona e a transição do DS, associar o domínio principal ao Worker, definir o comportamento de `www` e repetir a verificação no domínio. Somente depois dessa validação deve ser removida a conexão do domínio no Lovable. Reativar DNSSEC com a chave do Cloudflare após estabilizar a delegação.

O diagnóstico anterior, em `CONEXAO-DNS.md`, é um retrato anterior à publicação. O guia oficial exige [zona ativa para associar um Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/); consulte também a [migração dos nameservers e DNSSEC](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/).

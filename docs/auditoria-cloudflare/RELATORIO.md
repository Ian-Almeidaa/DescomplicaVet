# Auditoria da exportação Lovable e migração para Cloudflare

Data da revisão: 10/10/2026, America/Cuiaba.

## Parecer

O projeto pode operar sem Lovable, mas a exportação atual ainda não está pronta para desligar a plataforma. O build original funciona e já produz um Worker por meio de Nitro. Os bloqueios são quatro imagens ausentes, a configuração de build vinculada ao Lovable, vulnerabilidades nas dependências e a falta de validação na conta e no domínio de destino.

Esta entrega é uma auditoria com proposta de migração. O código do aplicativo, o manifesto e o lockfile foram preservados; foram adicionados somente relatórios, scripts de inspeção e o registro de verificação. Foram instaladas as versões existentes e gerado o build local. Nenhuma conta foi acessada, nenhum deploy foi feito e nenhum DNS foi alterado. A pasta recebida não contém `.git`, portanto não foi possível auditar histórico, branch conectada ou credenciais antigas em commits.

## O que existe no código

| Item | Evidência | Consequência |
| --- | --- | --- |
| React 19, TanStack Start, Vite 8, Tailwind 4 | `package.json`, `vite.config.ts` | Há renderização no servidor; publicar apenas arquivos estáticos não preserva a arquitetura atual. |
| Duas páginas | `src/routes/index.tsx`, `src/routes/politica-de-privacidade.tsx` | Página principal e política de privacidade. |
| Endpoint XML | `src/routes/sitemap[.]xml.ts` | `/sitemap.xml` é gerado no servidor. |
| Contato | `src/components/landing/contact.tsx`, `footer.tsx` | Links para WhatsApp e Instagram; o e-mail aparece como texto. Não há formulário enviado para backend. |
| Venda do e-book | `src/components/landing/ebook.tsx` | Checkout externo na Kiwify, sem processamento de pagamento neste aplicativo. |
| Banco, autenticação, uploads e IA | Não encontrados no código recebido | Não há migração de Supabase, usuários ou funções de IA identificada. Recursos existentes apenas no painel ainda precisam ser conferidos. |
| Variáveis e segredos | Nenhum uso de variáveis de aplicação ou segredo evidente localizado nos fontes/configurações recebidos | O código atual não exige uma chave do Lovable. Isso não comprova ausência de segredos em serviços remotos ou histórico. |

O inventário reproduzível contém **69 dependências diretas: 52 em dependencies e 17 em devDependencies**. O lockfile contém **587 entradas**, incluindo variantes de plataforma e versões duplicadas; isso não corresponde a 587 pacotes executando no site. A instalação desta máquina registrou 417 pacotes instalados. Veja [todas as dependências e decisões propostas](dependencias.md) e [o inventário JSON com imports e hashes](inventario.json).

## Vínculos com Lovable e sua substituição

### 1. Configuração do build

`vite.config.ts` importa `defineConfig` de `@lovable.dev/vite-tanstack-config@2.13.1`. Esse é o único pacote `@lovable.dev/*` presente no lockfile. Os outros nomes Lovable em `bunfig.toml` são exceções de instalação, não dependências efetivamente instaladas.

A leitura do pacote instalado confirmou que ele reúne TanStack Start, React, Tailwind, resolução de caminhos, deduplicação de React/Query, proteção de imports do servidor, Nitro e plugins de desenvolvimento. Substituir apenas a linha de import deixaria essas funções sem configuração. A proposta é explicitar os plugins oficiais em Vite e adotar `@cloudflare/vite-plugin` com Wrangler local, retirando o wrapper. Ao escolher esse adaptador, retirar também Nitro e a camada específica de h3, preservando tratamento seguro de erros e CSRF. Nitro é um projeto independente e não constitui, sozinho, dependência de serviço do Lovable.

O [guia oficial do Cloudflare para TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/) orienta usar o plugin Cloudflare e remover outro adaptador, como Nitro, antes de adicioná-lo. As versões novas devem ser escolhidas por compatibilidade com o TanStack e Vite instalados, fixadas em lockfile e testadas; esta auditoria não alterou versões.

### 2. Quatro imagens não exportadas

Os arquivos `src/assets/*.asset.json` são metadados; não contêm os pixels. Todos apontam para `/__l5e/assets-v1/...`, e nenhuma das quatro imagens existe em seu caminho local. A página principal ainda emite essas URLs no HTML compilado.

| Imagem | Tamanho declarado | Uso atual |
| --- | ---: | --- |
| `capa-cris.png` | 2.136.399 bytes | Foto principal e imagem social/SEO |
| `capa-ebook.png` | 2.243.056 bytes | Capa do e-book |
| `descomplica-circle.png` | 442.397 bytes | Imagem da seção Quem Somos |
| `descomplica-mark.png` | 77.130 bytes | Logo no cabeçalho e no rodapé |

O proxy do pacote Lovable encaminha essas URLs ao host definido em `LOVABLE_PREVIEW_HOST` somente no desenvolvimento. Ele não baixa as imagens no build. O teste do build exportado confirmou **404 nas quatro URLs**. Os JPGs existentes em `src/assets` não substituem esses PNGs automaticamente.

Recuperar os originais pelo projeto/armazenamento do Lovable ou por uma cópia de propriedade do usuário; validar formato, tamanho e aparência. Colocar os arquivos, por exemplo, em `public/images/` e substituir as referências nos cinco componentes e no SEO. Confirmar dimensões reais, `og:image` e carregamento direto. O favicon local possui o mesmo tamanho declarado do logo, mas isso não comprova identidade dos arquivos e não resolve as outras imagens.

Para este pequeno conjunto de imagens fixas, o diretório público do próprio Worker é suficiente; R2 separado é uma opção futura para arquivos dinâmicos. Não é necessário manter um proxy para o Lovable. A documentação do Lovable esclarece que exportar código não inclui os arquivos armazenados em storage: [migração para hospedagem externa](https://docs.lovable.dev/tips-tricks/external-deployment-hosting).

### 3. Telemetria e metadados de editor

`src/lib/lovable-error-reporting.ts` chama hooks opcionais `window.__lovableEvents` e `window.__lovableReportRuntimeError`, usados em `src/routes/__root.tsx`. Não há uma requisição direta a serviço remoto nesse módulo, e os hooks podem estar ausentes fora do editor. Ainda assim, removê-los elimina o vínculo de monitoramento com o editor; usar logs controlados do Cloudflare para erros do servidor.

`src/lib/error-capture.ts` intercepta globalmente `console.error` e guarda o último erro em memória compartilhada. O módulo não faz upload ao Lovable, mas a associação de um erro ao pedido errado é possível sob concorrência. Ao trocar Nitro pelo plugin Cloudflare, simplificar essa camada e usar registros por requisição, sem incluir dados sensíveis.

`.lovable/`, o README e o aviso em `AGENTS.md` são metadados/documentação; não hospedam o site. Arquivar/remover metadados de editor depois da migração. Não modificar histórico publicado nem forçar push. A conexão Git/Lovable só deve ser desligada depois que a nova publicação estiver validada.

`bunfig.toml` contém seis exceções Lovable ao prazo mínimo de publicação de pacotes. Retirá-las ao remover os pacotes correspondentes. Não adicionar exceções novas sem a confirmação exigida nesse arquivo.

## Dependências que podem ser reduzidas

As páginas de negócio não importam nenhum dos **46 arquivos de `src/components/ui`**. O projeto carrega também bibliotecas de calendário, gráficos, formulários, carrossel, OTP, painéis e componentes Radix que pertencem a esse conjunto sem uso. A remoção deve abranger componentes, hooks/utilitários que ficarem órfãos e pacotes, na mesma alteração, seguida de build e tipos. Apagar só os pacotes deixa imports inválidos, mesmo quando esses componentes não são renderizados.

Manter React, React DOM, TanStack Router/Start, Lucide, Tailwind e os estilos de animação na arquitetura proposta. Tornar explícitos os plugins de React/Tailwind e a resolução do alias `@`. `@tailwindcss/vite` e `vite-tsconfig-paths` são ferramentas de build atualmente em `dependencies`; podem ir para `devDependencies`. Vite 8 informou que possui resolução nativa de caminhos como alternativa; a troca deve ser verificada antes de retirar o plugin.

React Query é usado somente para criar e fornecer um QueryClient; não foram encontradas queries ou mutations de negócio. É uma redução opcional: retirar a dependência junto com o provider e o contexto do router. `@tanstack/router-plugin` não possui import explícito nos fontes; reavaliar sua declaração direta, pois a integração Start já configura a geração de rotas. Ferramentas de lint, tipos, compilação e React DOM têm usos implícitos; não podem ser removidas apenas porque um scanner não encontrou um import.

Remover dependências sem uso reduz manutenção, mas não é requisito para independência do Lovable. A prioridade é remover o wrapper e os caminhos de imagens e corrigir vulnerabilidades do runtime.

## Segurança

### Vulnerabilidades verificadas

`bun audit --json` retornou código 1 e **30 registros em 11 nomes de pacotes**, correspondentes a **24 URLs de advisories distintas**. Há **2 registros críticos, 20 altos, 6 moderados e 2 baixos**. Alguns advisories têm mais de uma faixa de versão e aparecem repetidos; esses números não representam 30 explorações independentes. A evidência integral está em [vulnerabilidades.json](vulnerabilidades.json).

| Pacote e versão no lock | Maior severidade retornada | Contexto e ação |
| --- | --- | --- |
| `seroval@1.5.4` | Crítica | Transita pelo TanStack e foi encontrado no bundle do servidor. Atualizar a cadeia TanStack/Seroval e verificar compatibilidade. |
| `shell-quote@1.9.0` | Crítica | Vem de `launch-editor`, usado por devtools do wrapper Lovable. Remover essa cadeia ao retirar o wrapper ou atualizar. Não foi demonstrada exposição desse caminho em produção. |
| `brace-expansion@1.1.14` e `5.0.5` | Alta | Cadeias de minimatch, inclusive ferramentas TypeScript/ESLint. Atualizar pais e versões transitivas. |
| `browserslist@4.28.2` | Alta | Cadeia Babel/build. Atualizar ferramentas e transitivas. |
| `js-yaml@4.1.1` | Alta | Dependência de ferramentas, incluindo ESLint e xmlbuilder2. Atualizar cadeia e revisar alcance no bundle final. |
| `nanoid@3.3.12` | Alta | Via PostCSS; atualizar cadeia. |
| `postcss@8.5.15` | Alta | Via Vite; atualizar ferramenta/cadeia. |
| `source-map-js@1.2.1` | Alta | Via PostCSS/Tailwind; atualizar cadeia. |
| `baseline-browser-mapping@2.10.21` | Moderada | Via Browserslist; atualizar cadeia. |
| `@babel/core@7.29.0` | Baixa | Ferramenta de build; atualizar cadeia. |
| `esbuild@0.27.7` dentro de `tsx` | Baixa | Alerta para dev server no Windows; há também `0.25.12` no lock. Atualizar cadeia afetada e manter desenvolvimento restrito à máquina. |

O [advisory crítico do Seroval](https://github.com/advisories/GHSA-p6vx-979v-rg4c) cobre a versão instalada; a correção indicada nele é 1.6.2. Contudo, o [advisory de esgotamento de memória](https://github.com/advisories/GHSA-jp82-f5mq-hwhp) também afeta 1.6.2 e indica 1.6.3. Portanto, apenas atualizar para 1.6.2 não resolve os dois alertas. Selecionar versão compatível a partir de 1.6.3 e repetir a auditoria de toda a cadeia. O [advisory de shell-quote](https://github.com/advisories/GHSA-pqg4-j6r4-53mv) indica correção em 1.11.0.

A presença de uma versão vulnerável está comprovada; exploração específica deste site não foi demonstrada. Não foram enviados payloads de exploração. Não há server functions de negócio no código recebido, mas isso não dispensa corrigir o serializador do framework. Hospedar no Cloudflare não corrige automaticamente bibliotecas vulneráveis.

### Proteções que precisam acompanhar a mudança

1. **Cabeçalhos:** as respostas HTML locais não incluem CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy ou Permissions-Policy. Configurá-los no Worker para HTML/SSR, erros e 404; usar `_headers` para estáticos. O [Cloudflare documenta que `_headers` não se aplica a respostas geradas pelo Worker](https://developers.cloudflare.com/workers/static-assets/headers/). Isso não prova ausência de regras atuais no painel, que não foi acessado.
2. **CSP compatível com SSR:** TanStack emite scripts de hidratação inline; `renderErrorPage` contém um `onclick` inline. Uma política genérica `script-src 'self'` pode quebrar a página. Planejar nonces/hashes e validar no navegador; iniciar em Report-Only e promover após resolver violações. Bloquear enquadramento em produção, considerando o efeito sobre o preview do Lovable enquanto ele ainda for usado.
3. **Segredos:** ampliar `.gitignore` para `.env`, `.env.*`, variantes de `.dev.vars` e exceção para `.env.example`. O ignore atual não cobre todos esses caminhos. Nenhum `.env` foi recebido. Qualquer variável `VITE_*` pode ir para o navegador e deve ser tratada como pública. Guardar credenciais futuras como secrets do Worker, conforme [documentação de secrets](https://developers.cloudflare.com/workers/configuration/secrets/).
4. **CSRF e erros:** preservar `createCsrfMiddleware` de `src/start.ts` ao refazer a configuração. O teste atual não exercitou server functions porque não há funções de negócio. Preservar mensagens genéricas para visitantes e impedir stack traces/segredos no HTML. Rever o armazenamento global de erros e limitar dados nos logs.
5. **Código sem uso:** `chart.tsx` usa `dangerouslySetInnerHTML` para CSS. Não está no grafo das páginas atuais; não é evidência de XSS explorável hoje. Remover se desnecessário; se passar a receber configuração externa, validar identificadores e valores antes de interpolar. `sidebar.tsx` grava cookie de estado visual; também não é usado nas páginas e não é cookie de autenticação.
6. **Operação:** usar permissões mínimas na conta/CI, MFA, acesso privado ao repositório conforme a necessidade, builds reproduzíveis e acompanhamento de logs/erros/custos. Não incluir tokens no chat ou no repositório. Conferir [limites](https://developers.cloudflare.com/workers/platform/limits/) e [preços](https://developers.cloudflare.com/workers/platform/pricing/) do plano escolhido antes de prometer capacidade ou custo. Não foi dimensionado tráfego.

## Serviços externos que permanecem

| Serviço | Quando é utilizado | Opção de independência |
| --- | --- | --- |
| Google Fonts | Ao carregar páginas, para Inter e Manrope | Hospedar arquivos das fontes localmente, preservando licenças e aparência. Isso elimina uma requisição externa durante a visita. |
| `wa.link` | Quando o visitante clica no contato | Trocar por URL direta oficial do WhatsApp depois de confirmar o número; o texto do contato omite um dígito em relação ao rodapé/SEO. |
| Instagram | Ao clicar nos links | Manter o canal comercial. Não há embed de Instagram identificado. |
| Kiwify | Ao clicar em comprar e-book | Manter checkout e entrega externa. Para remover esse fornecedor seria preciso implementar/substituir venda e entrega, fora da migração de hospedagem. |
| Domínio `descomplicavetmt.com.br` | URLs canônicas, sitemap e imagens sociais | Confirmar titularidade, DNS e configuração no destino. |

Os parâmetros longos de tracking no link Kiwify não são uma credencial, mas podem ser simplificados após confirmar atribuição comercial desejada. A política de privacidade é genérica e não descreve concretamente hospedagem, logs e fontes externas; alinhar o texto à operação final. Esta auditoria técnica não certifica conformidade jurídica.

## Caminho de publicação proposto

Recomendo **Cloudflare Workers com Static Assets, preservando TanStack Start e SSR**. Esse caminho mantém HTML renderizado para SEO e o endpoint de sitemap, com menor alteração funcional. Uma versão totalmente estática também seria possível para o conteúdo atual, mas exigiria prerenderizar as páginas, produzir sitemap estático e validar rotas/404; essa conversão não foi feita.

O build original gera `.output/server/index.mjs`, `.output/public/` e `.output/server/wrangler.json`. Ele escolheu automaticamente o nome `ian-almeidaa-modelo-espaco-estetica-downloads-descomplicavetmt`, derivado do ambiente, e não um destino confirmado pelo usuário. Não usar esse resultado para publicar cegamente. Fixar nome, conta e data de compatibilidade na configuração-fonte; não editar arquivos gerados como solução permanente. Com o plugin Cloudflare, os caminhos de saída mudam e devem ser confirmados no build novo.

Sequência concreta:

1. Guardar a exportação original e os PNGs recuperados. Confirmar repositório, branch e domínio. Não reescrever histórico sincronizado com Lovable.
2. Trocar wrapper/Nitro pelos plugins oficiais, adicionar Wrangler local e configuração versionada, fixar ferramentas e lockfile. Revisar o entrypoint para não criar import recursivo do servidor; alinhar o wrapper de erros ao entrypoint do adaptador escolhido.
3. Hospedar as quatro imagens em arquivos locais e atualizar suas referências e o SEO. Opcionalmente hospedar fontes localmente e retirar componentes/dependências sem uso.
4. Corrigir os alertas de runtime e a cadeia de desenvolvimento; completar typecheck e lint, incluindo os 68 problemas de formatação já existentes. Adicionar os cabeçalhos e revisar CSRF/logs/secrets.
5. Rodar instalação congelada, build, tipos e lint. Testar no runtime local do Cloudflare com a versão fixada de Wrangler/plugin e executar `wrangler deploy --dry-run` conforme a configuração gerada. O dry-run valida empacotamento, não DNS nem conta/recursos em produção.
6. **Com autorização de conta e publicação**, identificar a conta correta, conferir colisões de nome e criar uma publicação de homologação. Usar nome próprio de homologação; nenhum binding de banco, storage dinâmico ou API secreta é necessário para as funcionalidades identificadas. Bloquear indexação da homologação e decidir sua visibilidade.
7. Verificar no endereço real: `/`, `/politica-de-privacidade`, `/sitemap.xml`, `/robots.txt`, favicon, imagens, CSS/JS, 404, mobile, hidratação/menu, âncoras, links e checkout. Inspecionar rede para ausência de `/__l5e`, hosts/scripts Lovable e chamadas inesperadas. Testar GET/HEAD, tipos MIME, cabeçalhos e logs.
8. **Com autorização específica de troca de tráfego**, conectar domínio, HTTPS e redirecionamento www/apex. Exportar DNS antes; preservar MX, SPF, DKIM, DMARC e demais registros. Ter acesso ao registrador caso os nameservers precisem mudar. Não é necessário transferir o registro do domínio só para hospedar o site no Cloudflare.
9. Revalidar URLs canônicas, metadados sociais, sitemap, certificados, segurança e links no domínio final. Preparar uma correção/reversão que mantenha o site disponível. Monitorar por um intervalo acordado, com critérios explícitos de erros e disponibilidade.
10. Somente após essa validação, desconectar sincronização/domínio/serviços do Lovable e cancelar hospedagem quando apropriado. Exclusão de projeto/conta é uma ação separada: fazer backup antes e pedir autorização específica para a exclusão.

As instruções de migração do [Cloudflare](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/) e de [saída do Lovable](https://docs.lovable.dev/tips-tricks/external-deployment-hosting) sustentam esse caminho. Não é possível garantir publicação e disponibilidade futuras apenas por análise do código ou por build local bem-sucedido.

## Resultados dos testes realizados

| Verificação | Resultado | Limite da evidência |
| --- | --- | --- |
| Instalação `bun install --frozen-lockfile` | Passou; Bun 1.4.2, 417 pacotes instalados | Versões originais preservadas. |
| `bun run build` | Passou; preset Nitro `cloudflare-module` | Build original com wrapper Lovable; não é a configuração independente proposta. |
| `tsc --noEmit --pretty false` | Passou | Verificação de tipos, não teste de comportamento. |
| ESLint nos fontes e configurações originais | Falhou: 68 erros Prettier e 7 avisos de Fast Refresh | Nenhum erro adicional de outras regras nesse escopo. Saída em [lint.json](lint.json); não foi aplicado autofix. |
| Handler compilado sob Node | `/`, política e sitemap retornaram 200; rota inexistente retornou 404 | Node 25.9.0 com binding ASSETS simulado; não é workerd, teste visual ou teste remoto. |
| Quatro URLs de imagem Lovable no handler | Todas retornaram 404 | Confirma que o bundle recebido não serve esses PNGs. |
| Auditoria pública de dependências | Falhou com alertas, incluindo 2 críticos | Não comprova exploração; exige correção e reavaliação contextual. |
| Hashes dos fontes, package.json e bun.lock após os testes | Sem alterações | O build não modificou os arquivos recebidos monitorados. |
| Deploy/dry-run/workerd/contas/DNS | Não executados | Não há aprovação de destino, Wrangler local ou conexão de conta estabelecida nesta auditoria. |

As sondagens estão em [ssr-local.json](ssr-local.json). A tentativa de consultar o domínio público pela ferramenta web não retornou conteúdo acessível; isso não basta para concluir que o domínio esteja fora do ar. Nenhuma afirmação sobre sua configuração atual foi inferida desse resultado.

## Critérios para desligar Lovable e autorizações restantes

Ainda precisam ser comprovados: build independente; originais das quatro imagens sob seu controle; cadeia de runtime sem alertas críticos/altos aplicáveis pendentes; execução real em Cloudflare; páginas e navegação aprovadas em desktop/mobile; nenhuma chamada Lovable na rede; domínio/HTTPS/SEO e DNS de e-mail preservados; pipeline de atualização e backup/recuperação documentados.

Para avançar, preciso da autorização solicitada por você para consultar o projeto Lovable e recuperar os originais, e consultar sua conta Cloudflare para identificar conta, zona e destino. Publicação de homologação, alteração de DNS e exclusão no Lovable são etapas distintas; a primeira conexão não autoriza exclusão. Se você já possui os PNGs originais fora do Lovable, a conexão ao Lovable pode ser dispensada. Credenciais devem ser fornecidas por fluxo de conexão seguro, nunca coladas na conversa.

A auditoria local pode ser considerada entregue. A migração e a garantia de funcionamento no destino permanecem pendentes dessas correções e validações.

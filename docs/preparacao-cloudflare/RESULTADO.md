# Preparação local concluída — DescomplicaVetMT

Data: 10/10/2026. Escopo: corrigir o export local e recuperar as imagens para preparar a transferência. Nenhuma publicação, alteração de DNS ou exclusão de serviço foi feita.

## Resultado

O código de execução e o build passaram a usar o plugin oficial do Cloudflare, sem o wrapper do Lovable, Nitro ou o envio de erros ao Lovable. A configuração segue o [guia oficial de TanStack Start no Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/), preservando a renderização no servidor e o sitemap.

As dependências diretas passaram de **69 para 25**: 7 de aplicação e 18 de desenvolvimento. Os componentes de UI sem uso foram arquivados, junto com os metadados do editor e a configuração antiga do shadcn. React, TanStack Start, Vite e dependências transitivas foram atualizados; `seroval` tem override em 1.6.9. O `bun.lock` registra as versões verificadas.

As quatro imagens originais foram recuperadas de `https://descomplicavetmt.com.br`, validadas como PNG e comparadas aos tamanhos declarados no export. Também foram inspecionadas visualmente. Agora são arquivos locais:

| Arquivo                                | Dimensões   |     Bytes |
| -------------------------------------- | ----------- | --------: |
| `public/images/capa-cris.png`          | 1254 × 1254 | 2.136.399 |
| `public/images/capa-ebook.png`         | 1024 × 1536 | 2.243.056 |
| `public/images/descomplica-circle.png` | 1000 × 1000 |   442.397 |
| `public/images/descomplica-mark.png`   | 512 × 512   |    77.130 |

Os endereços antigos aparecem somente no registro de procedência e nos backups. Não são requisitados pelo site novo. O retrato passou a declarar as dimensões corretas e a imagem de compartilhamento usa o endereço do domínio em `/images/`. O telefone exibido no contato foi alinhado ao rodapé e aos dados estruturados: `(65) 99966-7481`; o link original de WhatsApp foi preservado.

## Segurança aplicada

- CSP no Worker com nonce criptográfico por resposta, integrado aos scripts do TanStack. O cabeçalho interno usado na integração é sempre sobrescrito pelo Worker; nenhum valor enviado pelo visitante é aceito. HTML usa `Cache-Control: no-store` para evitar reutilizar nonce por cache.
- Bloqueio de enquadramento, `nosniff`, política de referência e restrição de câmera, microfone, localização e pagamento. HSTS é aplicado pelo Worker em HTTPS, sem estender a política a outros subdomínios.
- Cabeçalhos também configurados para arquivos estáticos em `public/_headers`. Respostas SSR recebem os cabeçalhos diretamente no Worker, conforme a [documentação de cabeçalhos do Cloudflare](https://developers.cloudflare.com/workers/static-assets/headers/).
- Middleware CSRF explícito para funções de servidor, proteção contra importação de código de servidor no cliente, mensagens de erro genéricas e logs escritos nos novos handlers sem conteúdo bruto de exceções.
- `.env`, `.dev.vars`, tipos gerados, saídas de build e backups locais ignorados pelo Git. O aplicativo atual não requer segredos nem bindings de banco/armazenamento.
- Logs e traces do Worker habilitados na configuração. Retenção, custos e acesso aos logs devem ser revisados na conta escolhida; o comportamento dos logs da plataforma não é definido somente pelos logs escritos no aplicativo.

Google Fonts ainda exige conexão com Google; a CSP permite apenas os domínios necessários para essas fontes. Estilos inline continuam permitidos para manter os estilos e animações existentes; scripts inline exigem o nonce. WhatsApp/`wa.link`, Instagram e Kiwify continuam destinos externos dos botões. Nenhum pagamento foi realizado e os destinos de checkout/atendimento ainda precisam ser conferidos pelo responsável. Independência do Lovable não significa ausência de bibliotecas de código aberto ou desses serviços externos.

## Validação e evidências

`bun run verify` reproduz as verificações. Os arquivos JSON nesta pasta registram horários, hashes e resultados:

- `independencia.json`: fontes, configuração, lockfile e verificação do bundle cliente sem referências operacionais ao Lovable; controles positivos da busca.
- `imagens-recuperadas.json`: procedência, tamanho, dimensões e SHA-256 das quatro imagens.
- `toolchain.json`: geração de tipos do Wrangler, build de produção, TypeScript e ESLint, sem erros ou avisos de lint.
- `auditoria-dependencias.json`: zero registros de vulnerabilidades conhecidas no momento da consulta. Isso não constitui garantia de ausência de falhas desconhecidas.
- `runtime-cloudflare.json`: home, política de privacidade, sitemap, robots, favicon, rota inexistente, quatro imagens e arquivos de CSS/JS; statuses, cabeçalhos e hashes. Inclui respostas HEAD, rotação de nonce, isolamento entre requisições simultâneas e rejeição de nonce fornecido pelo visitante.
- O mesmo teste inclui `wrangler deploy --dry-run`, sem publicar nem criar recursos remotos.

Também foi verificada a inicialização em modo de desenvolvimento e a presença do nonce correspondente nos scripts HTML. O navegador conectado não estava disponível nesta sessão; interações, layout responsivo e ausência de erros no console ainda precisam ser verificados em navegador na etapa de homologação. Os testes locais não comprovam configuração de conta, cotas, SSL, DNS ou funcionamento público após a troca de domínio.

## Próxima etapa: transferência

1. Com autorização do usuário, conectar à conta Cloudflare e confirmar conta, zona de `descomplicavetmt.com.br`, recursos existentes, titularidade e permissões de publicação. Não colocar tokens no chat ou no repositório.
2. Preservar uma cópia fora desta pasta e registrar os DNS atuais, inclusive MX/TXT usados por e-mail e validações. Este export não contém `.git`; se houver repositório remoto conectado ao Lovable, revisar a integração sem reescrever seu histórico.
3. Confirmar o nome `descomplicavetmt`, gerar o build com o lockfile e publicar inicialmente em endereço `workers.dev`, mediante autorização de publicação. Testar HTTPS, rotas, imagens, console, celular, botões, compartilhamento e cabeçalhos no endereço público. Não alterar o domínio antes de aprovar essa homologação.
4. Preparar a configuração do domínio e a mudança exata dos registros necessários, com plano de retorno aos valores atuais. Aplicar somente depois da autorização para a troca. Se necessário, decidir também o comportamento de `www.descomplicavetmt.com.br` e seus redirecionamentos.
5. Repetir a validação no domínio principal após a propagação e conferir certificados, redirecionamentos, sitemap e imagem social. Manter o site antigo disponível durante a transição.
6. Depois da aprovação do site no Cloudflare, desvincular domínio/GitHub do Lovable e encerrar o projeto/assinatura conforme autorização específica. As imagens locais e o aplicativo já não exigem acesso ao Lovable para funcionar; o encerramento da conta e das integrações é uma ação separada.

O artefato envolve **Worker + arquivos estáticos**. Não enviar apenas `dist/client` como um site estático. `dist/server/wrangler.json` é gerado pelo plugin e o Wrangler usa o redirecionamento em `.wrangler/deploy/config.json`; alterações devem ser feitas em `wrangler.jsonc` e seguidas de novo build.

## Recuperação local

O export original está em `.migration-backup/original/`; a UI não utilizada está em `.migration-backup/unused-ui/`; os metadados e scripts históricos estão em `.migration-backup/retired-metadata/`. São backups ignorados pelo Git, não um backup externo garantido. Os relatórios de `docs/auditoria-cloudflare/` descrevem o estado anterior às correções; eventuais referências antigas ali são históricas.

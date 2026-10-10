# Gates: auditoria de independência e migração

OWNS: GATES.md, docs/auditoria-cloudflare/**, scripts/audit-migration.mjs, scripts/audit-ssr-smoke.mjs

Scope: auditar o código exportado, inventariar dependências, testar a configuração original e entregar um plano verificável de migração; acesso a contas, alterações no aplicativo e publicação aguardam autorização específica.

- [x] G1: Todas as dependências diretas e os arquivos de referência de imagens possuem inventário reproduzível.
  CHECK: node scripts/audit-migration.mjs
  EXPECT: INVENTARIO_COMPLETO
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\IAN\Downloads\descomplicavetmt; path=5da3f17fa34b/30 entries; EXPECT=matched; output-sha256=74c3976c0ed6e18c6dcac366654c1e3bc636042ff7efc709ef85b8c7813587c8; output-bytes=76

- [x] G2: Os resultados de instalação, build, lint, tipos e auditoria de vulnerabilidades estão registrados com suas limitações.
  EVIDENCE: RELATORIO.md: instalação congelada/build/tipos exit 0; lint.json contém 68 erros de formatação e 7 avisos; vulnerabilidades.json contém 30 registros; ssr-local.json registra 200 nas páginas e sitemap e 404 nas quatro imagens. Runtime Node, não workerd.

- [x] G3: Os vínculos com Lovable e os riscos de segurança foram revisados com referências aos arquivos.
  EVIDENCE: Revisados wrapper instalado 2.13.1, proxy somente dev, quatro metadados de imagem, hooks opcionais de telemetria, captura global de erros, CSRF, headers locais, ignore de secrets e cadeia Seroval; RELATORIO.md cita fontes e distingue vulnerabilidade de exploração.

- [x] G4: O relatório cobre publicação no Cloudflare, recuperação de imagens, domínio, validação e critérios para desligar Lovable.
  EVIDENCE: RELATORIO.md contém sequência de dez etapas, worker com static assets, troca de adaptador, nome gerado incorreto, homologação, critérios de rede/rotas/SEO, preservação de DNS de email, recuperação e desligamento condicionado à validação.

- [x] G5: O relatório diferencia evidência local de validação remota e identifica as autorizações necessárias.
  EVIDENCE: Relatório declara ausência de conta/deploy/DNS/workerd/dry-run, limita sondagem Node, registra ausência de .git e solicita conexão Lovable/Cloudflare separada de exclusão; não promete garantia com base apenas no build.

# Gates: preparação local para Cloudflare

OWNS: src/**, public/**, scripts/**, package.json, bun.lock, bunfig.toml, vite.config.ts, wrangler.jsonc, tsconfig.json, eslint.config.js, .gitignore, .prettierignore, README.md, GATES.md, docs/preparacao-cloudflare/**, .migration-backup/**, .lovable/**, components.json

Scope: aplicar correções locais autorizadas, recuperar imagens originais e verificar build, segurança e runtime Cloudflare local; publicação e DNS serão tratados na próxima etapa.

- [x] G1: O aplicativo e o lockfile não dependem de pacotes, telemetria ou rotas de assets do Lovable.
      CHECK: node scripts/verify-local-migration.mjs independence
      EXPECT: INDEPENDENCE_OK
      EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\IAN\Downloads\descomplicavetmt; path=5da3f17fa34b/30 entries; EXPECT=matched; output-sha256=7212cc1679f90e6730ea8b56207ed0320799ff8093a35aee8971cd46fd5c3aeb; output-bytes=16

- [x] G2: As quatro imagens originais estão disponíveis localmente com integridade e procedência registradas.
      CHECK: node scripts/verify-local-migration.mjs assets
      EXPECT: ORIGINAL_ASSETS_OK
      EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\IAN\Downloads\descomplicavetmt; path=5da3f17fa34b/30 entries; EXPECT=matched; output-sha256=5a8c0d08358b37a577382811407fc32c51cadbf378f4ce02ab1b4841e1093588; output-bytes=19

- [x] G3: Build de produção, tipos e lint passam com as dependências atualizadas.
      CHECK: node scripts/verify-local-migration.mjs toolchain
      EXPECT: TOOLCHAIN_OK
      EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\IAN\Downloads\descomplicavetmt; path=5da3f17fa34b/30 entries; EXPECT=matched; output-sha256=fcd04bab97755d5fe6b58d6aa952155bf693a644a68003ad1e362239646a4dbb; output-bytes=13

- [x] G4: A auditoria de dependências não retorna alertas altos ou críticos sem tratamento.
      CHECK: node scripts/verify-local-migration.mjs audit
      EXPECT: DEPENDENCY_AUDIT_OK
      EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\IAN\Downloads\descomplicavetmt; path=5da3f17fa34b/30 entries; EXPECT=matched; output-sha256=97c14cf3d0f4bd71bcbfcd5022010cb3550337065fc973931bfb43f0570b088d; output-bytes=50

- [x] G5: Rotas, imagens, proteção de respostas e sitemap funcionam no runtime local do Cloudflare e o pacote passa no dry-run.
      CHECK: node scripts/verify-local-migration.mjs runtime
      EXPECT: CLOUDFLARE_LOCAL_OK
      EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=C:\Users\IAN\Downloads\descomplicavetmt; path=5da3f17fa34b/30 entries; EXPECT=matched; output-sha256=e61b27224fa815480d48c1b337adfcbda68307db0c6267de23dd229d39148591; output-bytes=20

- [x] G6: A documentação registra as alterações, limitações e a próxima etapa de transferência sem publicar ou alterar DNS.
      EVIDENCE: README.md e docs/preparacao-cloudflare/RESULTADO.md revisados contra as mudanças e evidências; procedimentos separam homologação workers.dev, troca de DNS e encerramento do Lovable. Limites de validação local e ausência de navegador registrados. Nenhum comando de publicação remota executado.

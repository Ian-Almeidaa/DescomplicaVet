# Gates: publicação do Worker

Scope: criar e publicar o Worker descomplicavetmt na conta Cloudflare autorizada, validar sua URL pública e conferir o estado DNS após a alteração de nameservers feita pelo usuário. Vinculação do domínio depende da ativação da zona e da validação do Worker; encerramento do Lovable será feito pelo usuário depois.

- [x] P1: A autenticação de publicação identifica a conta autorizada e permite escrita de Workers.
  EVIDENCE: Wrangler whoami retornou studiocriandoweb@gmail.com e conta d83f93d98b206993dacf24d563578716; OAuth workers_scripts:write, workers_routes:write e ssl_certs:write conferidos; credenciais criptografadas com chave no Windows Credential Manager; upload posterior confirmou escrita autorizada.

- [x] P2: O build e o pacote conferido para publicação correspondem ao projeto independente validado localmente.
  CHECK: node scripts/verify-local-migration.mjs toolchain
  EXPECT: TOOLCHAIN_OK
  EVIDENCE: exit=0; shell=PowerShell 7; cwd=C:\Users\IAN\Downloads\descomplicavetmt; EXPECT=matched; output-sha256=fcd04bab97755d5fe6b58d6aa952155bf693a644a68003ad1e362239646a4dbb; output-bytes=13. toolchain.json registra os quatro subprocessos com status 0. Independencia, imagens e wrangler deploy --dry-run tambem passaram antes do upload.

- [x] P3: O Worker descomplicavetmt está publicado e sua versão foi identificada.
  EVIDENCE: wrangler deploy --strict terminou com exit=0 e versao 6029a47d-59e5-416c-97aa-3c87f5559cb2. API GET deployments confirmou deployment 0e5d34be-9952-4938-a957-c1fd90b0dada e versao com 100% do trafego; transcript em publicacao-worker.txt.

- [x] P4: As rotas, imagens e proteções HTTP respondem corretamente na URL pública do Worker.
  CHECK: node scripts/verify-public-worker.mjs https://descomplicavetmt.studiocriandoweb.workers.dev
  EXPECT: PUBLIC_WORKER_OK
  EVIDENCE: exit=0; shell=PowerShell 7; cwd=C:\Users\IAN\Downloads\descomplicavetmt; EXPECT=matched. publico-descomplicavetmt.studiocriandoweb.workers.dev.json registra success=true, 10 probes, hashes das imagens, cabecalhos, HEAD e rotacao de nonce. Navegador conectado indisponivel; revisao visual pelo usuario explicitada no relatorio.

- [x] P5: O estado público de DNS, DNSSEC e domínio foi registrado com a próxima ação necessária.
  EVIDENCE: API retornou zona pending, sem Custom Domain; consultas 1.1.1.1/8.8.8.8 em dns-pos-publicacao.json e RDAP em registro-pos-publicacao.json. RDAP confirma DS anterior removido e nameservers ainda do Registro.br. PUBLICACAO.md exige ativacao, associacao e validacao do dominio antes de desconectar Lovable; transferencia do dominio ainda nao declarada concluida.

# Conexão Cloudflare e diagnóstico do domínio

Consulta em 10/10/2026, somente leitura. Nenhum registro DNS, nameserver, recurso Cloudflare ou configuração do Lovable foi alterado.

## Conexão confirmada

A conexão Cloudflare autenticou como `studiocriandoweb@gmail.com`. A zona `descomplicavetmt.com.br` já existe na conta correspondente, no plano Free Website, com status `pending`. Não foi criada nesta consulta.

Nameservers atribuídos especificamente a esta zona:

```text
mike.ns.cloudflare.com
nena.ns.cloudflare.com
```

As permissões retornadas para a zona nesta conexão são de leitura, incluindo `#zone:read`, `#dns_records:read` e `#worker:read`. Consulta bem-sucedida não confirma permissão de publicação. A publicação por Wrangler exigirá autenticação com acesso de escrita ao Worker e autorização do usuário; a alteração de domínio/DNS é uma etapa separada.

## Estado observado

| Item | Resultado |
| --- | --- |
| Registro público RDAP | Domínio ativo; expiração indicada em 13/08/2027 |
| Nameservers públicos atuais | `a.sec.dns.br`, `b.sec.dns.br` |
| A público da raiz | `185.158.133.1` |
| A público de www | `185.158.133.1` |
| DNSSEC no registro | Ativo, DS key tag `34245`, algoritmo `13`, digest type `2` |
| DNSSEC na zona Cloudflare | Desabilitado |
| DNS importado no Cloudflare | Dois registros A, raiz e www, ambos `185.158.133.1`, proxy habilitado, TTL automático |
| Worker chamado descomplicavetmt | Não encontrado entre os Workers retornados |
| Custom Domain para raiz ou www | Não encontrado |

O IP observado corresponde ao endereço documentado pelo Lovable para domínios conectados. As consultas públicas de MX/TXT/AAAA na raiz não retornaram registros desses tipos. Isso não é um inventário completo: outros subdomínios, verificações, DKIM, SRV e CAA ainda devem ser conferidos na zona DNS do Registro.br. O usuário confirmou que tem acesso à conta do Registro.br.

## Significado para a migração

Não é necessário comprar outro domínio para hospedar o mesmo endereço no Cloudflare. Podemos manter o registro/renovação sob a gestão atual e mudar os responsáveis pelo DNS e pela hospedagem. O fato de o endereço estar conectado a um projeto Lovable não transfere, por si só, a titularidade do registro.

**Trocar somente os nameservers não conclui a saída do Lovable.** Os registros já importados no Cloudflare ainda apontam ao Lovable. É necessário publicar o aplicativo no Cloudflare e associar o domínio ao Worker, substituindo os apontamentos antigos na etapa de troca.

## Sequência proposta

1. Conferir e salvar a zona DNS completa no Registro.br, inclusive qualquer registro de e-mail ou verificação. Concluir o backup local fora da pasta de trabalho.
2. Autorizar e autenticar a publicação do Worker `descomplicavetmt` somente em `workers.dev`. Validar a versão pública em navegador antes da troca do domínio.
3. Preparar os registros Cloudflare para preservar os serviços necessários e definir o redirecionamento de www. Confirmar a estratégia de manutenção do site antigo durante a transição.
4. Tratar o DNSSEC anterior no Registro.br. A delegação assinada atual não pode continuar apontando à chave do DNS antigo após a migração; conferir o fluxo real do Registro.br e a propagação/TTL do DS antes de prosseguir. Não supor que basta um botão genérico de desativar DNSSEC.
5. Mediante autorização para a troca, substituir os nameservers atuais pelos dois nomes Cloudflare acima. Verificar a delegação e a ativação da zona. O Worker já deve estar publicado e validado; a associação do Custom Domain exige zona ativa.
6. Vincular o domínio ao Worker e substituir o destino Lovable. Validar HTTPS, home, política de privacidade, sitemap, imagens, botões, www, cabeçalhos e ausência de erros no navegador. Reativar DNSSEC com os dados Cloudflare e registrar o novo DS no Registro.br após estabilizar a delegação.
7. Somente depois de aprovado o domínio no Cloudflare, desconectar o domínio do projeto Lovable e tratar integrações/assinatura conforme autorização específica. Desconectar o domínio do Lovable não cancela o registro do domínio.

Rollback deve considerar tanto registros quanto delegação e DNSSEC. Restaurar nameservers antigos mantendo um DS incompatível também pode causar falha; não prometer retorno instantâneo devido aos caches DNS.

## Fontes

- API Cloudflare: identidade autenticada; listagem e detalhes da zona; registros DNS; estado DNSSEC; listagem de Workers e Custom Domains. Somente requisições GET.
- Consultas DNS públicas, incluindo DS via resolvedor 1.1.1.1.
- [RDAP público Registro.br](https://rdap.registro.br/domain/descomplicavetmt.com.br), com seleção apenas de dados técnicos e eventos do domínio.
- [Cloudflare: nameservers e DNSSEC](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/).
- [Cloudflare: domínio personalizado de Worker](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
- [Registro.br: gerenciamento e alteração de DNS](https://registro.br/ajuda/gerenciamento-de-conta).
- [Lovable: domínio conectado e desconexão](https://docs.lovable.dev/features/custom-domain).

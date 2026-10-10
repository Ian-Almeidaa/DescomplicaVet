# Inventário de dependências diretas

Versões efetivas do bun.lock original. A tabela cobre cada entrada do package.json; ausência no grafo não basta para remover ferramentas, tipos ou imports implícitos.

| Pacote | Declaração | Versão fixada | Decisão proposta |
| --- | --- | --- | --- |
| `@hookform/resolvers` | Aplicação | `5.2.2` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-accordion` | Aplicação | `1.2.12` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-alert-dialog` | Aplicação | `1.1.15` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-aspect-ratio` | Aplicação | `1.1.8` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-avatar` | Aplicação | `1.1.11` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-checkbox` | Aplicação | `1.3.3` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-collapsible` | Aplicação | `1.1.12` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-context-menu` | Aplicação | `2.2.16` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-dialog` | Aplicação | `1.1.15` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-dropdown-menu` | Aplicação | `2.1.16` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-hover-card` | Aplicação | `1.1.15` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-label` | Aplicação | `2.1.8` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-menubar` | Aplicação | `1.1.16` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-navigation-menu` | Aplicação | `1.2.14` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-popover` | Aplicação | `1.1.15` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-progress` | Aplicação | `1.1.8` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-radio-group` | Aplicação | `1.3.8` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-scroll-area` | Aplicação | `1.2.10` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-select` | Aplicação | `2.2.6` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-separator` | Aplicação | `1.1.8` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-slider` | Aplicação | `1.3.6` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-slot` | Aplicação | `1.2.4` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-switch` | Aplicação | `1.2.6` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-tabs` | Aplicação | `1.1.13` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-toggle` | Aplicação | `1.1.10` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-toggle-group` | Aplicação | `1.1.11` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@radix-ui/react-tooltip` | Aplicação | `1.2.8` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@tailwindcss/vite` | Aplicação | `4.2.4` | Manter como ferramenta explícita em devDependencies; hoje é carregada pelo wrapper. |
| `@tanstack/react-query` | Aplicação | `5.101.1` | Opcional: remover QueryClient e Provider juntos; não há consultas no site atual. |
| `@tanstack/react-router` | Aplicação | `1.170.16` | Manter na arquitetura atual; atualizar conforme auditoria e compatibilidade. |
| `@tanstack/react-start` | Aplicação | `1.168.26` | Manter na arquitetura atual; atualizar conforme auditoria e compatibilidade. |
| `@tanstack/router-plugin` | Aplicação | `1.168.18` | Reavaliar dependência direta: não há import explícito; Start já instala a geração de rotas. |
| `class-variance-authority` | Aplicação | `0.7.1` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `clsx` | Aplicação | `2.1.1` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `cmdk` | Aplicação | `1.1.1` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `date-fns` | Aplicação | `4.1.0` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `embla-carousel-react` | Aplicação | `8.6.0` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `input-otp` | Aplicação | `1.4.2` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `lucide-react` | Aplicação | `0.575.0` | Manter na arquitetura atual; atualizar conforme auditoria e compatibilidade. |
| `react` | Aplicação | `19.2.5` | Manter na arquitetura atual; atualizar conforme auditoria e compatibilidade. |
| `react-day-picker` | Aplicação | `9.14.0` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `react-dom` | Aplicação | `19.2.5` | Manter na arquitetura atual; atualizar conforme auditoria e compatibilidade. |
| `react-hook-form` | Aplicação | `7.73.1` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `react-resizable-panels` | Aplicação | `4.10.0` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `recharts` | Aplicação | `2.15.4` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `sonner` | Aplicação | `2.0.7` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `tailwind-merge` | Aplicação | `3.5.0` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `tailwindcss` | Aplicação | `4.2.4` | Manter na arquitetura atual; atualizar conforme auditoria e compatibilidade. |
| `tw-animate-css` | Aplicação | `1.4.0` | Manter na arquitetura atual; atualizar conforme auditoria e compatibilidade. |
| `vaul` | Aplicação | `1.1.2` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `vite-tsconfig-paths` | Aplicação | `6.1.1` | Manter como ferramenta explícita em devDependencies; hoje é carregada pelo wrapper. |
| `zod` | Aplicação | `3.25.76` | Candidata à remoção após excluir os componentes UI sem uso e seus imports; não remover isoladamente. |
| `@eslint/js` | Desenvolvimento | `9.39.4` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `@lovable.dev/vite-tanstack-config` | Desenvolvimento | `2.13.1` | Substituir pelo Vite + plugins oficiais; vínculo direto com Lovable. |
| `@types/node` | Desenvolvimento | `22.19.17` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `@types/react` | Desenvolvimento | `19.2.14` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `@types/react-dom` | Desenvolvimento | `19.2.3` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `@vitejs/plugin-react` | Desenvolvimento | `5.2.0` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `eslint` | Desenvolvimento | `9.39.4` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `eslint-config-prettier` | Desenvolvimento | `10.1.8` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `eslint-plugin-prettier` | Desenvolvimento | `5.5.5` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `eslint-plugin-react-hooks` | Desenvolvimento | `5.2.0` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `eslint-plugin-react-refresh` | Desenvolvimento | `0.4.26` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `globals` | Desenvolvimento | `15.15.0` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `nitro` | Desenvolvimento | `3.0.260603-beta` | Remover ao adotar @cloudflare/vite-plugin; Nitro é independente, mas o segundo adaptador conflita. |
| `prettier` | Desenvolvimento | `3.8.3` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `typescript` | Desenvolvimento | `5.9.3` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `typescript-eslint` | Desenvolvimento | `8.59.0` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |
| `vite` | Desenvolvimento | `8.0.16` | Manter ferramenta/tipos de desenvolvimento; uso pode ser implícito ou por CLI. |

O JSON ao lado registra os arquivos que importam cada pacote. Nenhuma dependência foi removida nesta auditoria.

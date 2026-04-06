## Plano de Implementação - Área Admin

### 1. Base de Dados (Migrações)
- Tabela `user_roles` com enum `app_role` (admin, user)
- Função `has_role()` security definer para verificar roles sem recursão RLS
- Tabelas `products`, `campaigns`, `settings` com RLS — apenas admins podem ler/escrever
- Políticas RLS usando `has_role(auth.uid(), 'admin')`

### 2. Autenticação
- Página `/auth` com login email/password
- Componente `ProtectedRoute` que verifica autenticação + role admin
- Redirect para `/auth` se não autenticado

### 3. Área Admin (`/admin`)
- Dashboard com navegação entre secções
- **Gestão de Produtos**: listar, criar, editar, eliminar produtos
- **Gestão de Campanhas**: listar, criar, editar, eliminar campanhas
- **Settings**: configurações gerais da loja (nome, contactos, etc.)

### 4. Segurança
- Rota `/admin` invisível para não-autenticados
- RLS em todas as tabelas — apenas admins acedem
- Sem link para admin no frontend público
- Role admin atribuído manualmente via base de dados

### 5. Frontend público
- Produtos e campanhas carregados da BD (substituir dados hardcoded)
- Sem alterações visuais no frontend público
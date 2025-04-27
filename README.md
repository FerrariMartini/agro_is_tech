
# 🌾 Agro API - Rural Producer Management System

API RESTful para gerenciamento de produtores rurais, propriedades e safras, desenvolvida com **NestJS**, **PostgreSQL**, e arquitetura **Hexagonal (Ports & Adapters)**.  
Foco em boas práticas de engenharia como testes unitários, segurança de dados, versionamento e documentação via Swagger.

---

## 🚀 Tecnologias e Padrões

- **Backend**: NestJS + TypeScript
- **Infraestrutura**: Docker + Docker Compose + PostgreSQL
- **Segurança**: Criptografia AES-256 para dados sensíveis, CORS restrito, Helmet, Rate Limiting e validação rigorosa de input.
- **Documentação**: Swagger (`/docs`)
- **Arquitetura**: Hexagonal (Ports and Adapters)
- **Boas práticas**: SOLID, DRY, KISS, Clean Code
- **Testes**: Unitários com Jest
- **Versionamento**: `X-API-Version` via header HTTP
- **Soft Delete**: Implementado em nível de repositório

---

## 🧾 Glossário
- **Producer**: Produtor
- **Property**: Propriedade Rural
- **Harvest**: Safra
- **Crop**: Cultura
---

## 📐 Regras de Negócio Atendidas - Domínio Agro (Crop, Harvest, Property, Producer)

| # | Regra de Negócio | Implementação | Status |
|:-|:------------------|:--------------|:------:|
| 1 | Cadastro, edição e exclusão de produtores rurais | Casos de uso: `CreateProducerUseCase`, `UpdateProducerUseCase` + `BaseCrudController` | ✅ |
| 2 | Validação de CPF ou CNPJ do produtor | Validação nos casos de uso | ✅ |
| 3 | Registro de várias culturas por fazenda do produtor | Relação: `Crop → Harvest → Property` | ✅ |
| 4 | Associação de um produtor a 0, 1 ou mais propriedades | Relação via `producerId` em `Property` | ✅ |
| 5 | Associação de uma propriedade a 0, 1 ou mais culturas por safra | Relação: `Harvest → Crop` | ✅ |
| 6 | Endpoint para gerar dados para o dashboard | Modulo Analytics Segregado  | ✅ |

---

## 🔎 Detalhamento dos Relacionamentos

| Entidade | Relacionamento | Descrição |
|:---------|:---------------|:----------|
| `Producer` → `Property` | `producerId` em `Property` | Um produtor pode possuir nenhuma, uma ou várias propriedades |
| `Property` → `Harvest` | `propertyId` em `Harvest` | Uma propriedade pode registrar múltiplas safras ao longo do tempo |
| `Harvest` → `Crop` | `harvestId` em `Crop` | Uma safra pode conter múltiplas culturas plantadas |

---

## 🗂️ Estrutura do Banco de Dados (ER)

### 🧾 Entidades

#### Producer
- `id`: UUID (PK)
- `taxId`: string (criptografado)
- `name`: string
- `email`: string
- `createdAt`: datetime
- `updatedAt`: datetime
- `deletedAt`: datetime \| null (soft delete)

#### Property
- `id`: UUID (PK)
- `name`: string
- `city`: string
- `state`: string
- `totalArea`: float
- `arableArea`: float
- `vegetationArea`: float
- `producerId`: UUID (FK → Producer.id)
- `createdAt`: datetime
- `updatedAt`: datetime
- `deletedAt`: datetime \| null (soft delete)

#### Harvest
- `id`: UUID (PK)
- `year`: int
- `description`: string
- `propertyId`: UUID (FK → Property.id)
- `createdAt`: datetime
- `updatedAt`: datetime
- `deletedAt`: datetime \| null (soft delete)

#### Crop
- `id`: UUID (PK)
- `description`: string
- `seed`: string
- `harvestId`: UUID (FK → Harvest.id)
- `createdAt`: datetime
- `updatedAt`: datetime
- `deletedAt`: datetime \| null (soft delete)

---

### 🔗 ERD

```
╔════════════════════════════════════════╗
║              Producer                  ║
╠════════════════════════════════════════╣
║ id            UUID          (PK)       ║
║ tax_id        string        (encrypted)║
║ tax_id_hash   string        (hash)     ║
║ name          string                   ║
║ email         string        (encrypted)║
║ created_at    datetime                 ║
║ updated_at    datetime                 ║
║ deleted_at    datetime|null            ║
╚════════════════════════════════════════╝
                    │
                    │ 1:N
                    ▼
          ╔════════════════════════════════════════╗
          ║               Property                 ║
          ╠════════════════════════════════════════╣
          ║ id                UUID         (PK)    ║
          ║ name              string               ║
          ║ city              string               ║
          ║ state             string               ║
          ║ total_area        float                ║
          ║ arable_area       float                ║
          ║ vegetation_area   float                ║
          ║ producer_id       UUID         (FK)    ║
          ║ created_at        datetime             ║
          ║ updated_at        datetime             ║
          ║ deleted_at        datetime|null        ║
          ╚════════════════════════════════════════╝
                              │
                              │ 1:N
                              ▼
                    ╔════════════════════════════╗
                    ║          Harvest           ║
                    ╠════════════════════════════╣
                    ║ id           UUID    (PK)  ║
                    ║ year         int           ║
                    ║ description  string        ║                    
                    ║ property_id  UUID    (FK)  ║
                    ╚════════════════════════════╝
                              │
                              │ 1:N
                              ▼
                    ╔════════════════════════════╗
                    ║           Crop             ║
                    ╠════════════════════════════╣
                    ║ id             UUID (PK)   ║
                    ║ description    string      ║    
                    ║ seed           string      ║    
                    ║ harvest_id     UUID  (FK)  ║
                    ╚════════════════════════════╝

```

---

## 🧱 Por que usamos Arquitetura Hexagonal?

A Arquitetura Hexagonal (ou Ports and Adapters) foi escolhida para garantir robustez, desacoplamento e testabilidade desde as primeiras fases do projeto. Seus principais benefícios neste contexto são:

- **Separação de responsabilidades**: Domínio, interfaces de entrada (REST) e saída (repositórios, criptografia) estão totalmente desacoplados.
- **Facilidade de testes unitários**: Casos de uso e entidades podem ser testados isoladamente, sem dependência de banco de dados ou HTTP.
- **Troca simples de tecnologias**: Trocar banco, criptografia ou qualquer adaptador não afeta a lógica central.
- **Modularidade escalável**: Cada domínio é isolado (ex: `producer`), facilitando evolução e manutenção.
- **Clareza arquitetural**: Facilita entendimento e onboarding de novos devs.
- **Preparação para crescimento**: A estrutura é ideal para evoluir para microsserviços ou domínios independentes futuramente.

### 🧱 Arquitetura Hexagonal

O projeto segue rigorosamente o padrão **Ports and Adapters**, com separação clara entre:

- **Domínio**: entidades, interfaces de repositório, DTOs
- **Application**: use cases e services
- **Interface de entrada**: controllers REST reutilizando um `BaseCrudController`
- **Interface de saída**: repositórios desacoplados
- **Infraestrutura**: TypeORM, implementações concretas, criptografia

Cada camada comunica-se via interfaces (`ports`) e implementações (`adapters`).

---

### 🔁 Generics e Reuso

O sistema utiliza abstrações reutilizáveis para CRUDs com tipagem forte:

- `BaseCrudService<TDomain, TCreateResponse, TUpdateResponse, TResponse>`
- `BaseCrudController<TDomain, TCreateResponse, TUpdateResponse, TResponse>`

Use cases reutilizáveis em `@shared/usecase`:

- `CreateEntityUseCase<T>`
- `UpdateEntityUseCase<T>`
- `FindEntityByIdUseCase<T>`
- `FindAllEntitiesUseCase<T>`
- `DeleteEntityUseCase<T>`

Factories são usadas por domínio para instanciar use cases e aplicar lógicas customizadas (ex: `ProducerUseCaseFactory`).

---

### 📂 Estrutura de Pastas (Hexagonal)

```
src/
├── application/        # Controllers, Services, Modules
├── domain/             # Entidades, Repositórios, UseCases, DTOs
├── infrastructure/     # Banco de dados, repositórios TypeORM, criptografia
├── shared/             # Use cases e serviços genéricos reutilizáveis

```

### 📂 Analytic (Modulo Segregado)

O módulo de Analytics foi criado para isolar as consultas agregadas do sistema principal, respeitando a separação entre:

- Domínio (Domain Layer) → responsável pelas regras de negócio essenciais, como cadastro de produtores, propriedades, cultivos e safras.
- Camada de Aplicação (Application Layer) → responsável por orquestrar casos de uso de leitura e montagem de relatórios, como dashboards analíticos.

As consultas de leitura complexas (queries analíticas) não devem poluir os casos de uso de escrita (CRUDs de produtor, propriedade, etc).

Por isso, criamos o módulo Analytics como um módulo separado dentro da camada de aplicação, com seus próprios controllers, services e use cases.

## ⚙️ Estratégia de Evolução

Este módulo foi projetado para crescer conforme as necessidades do sistema aumentem.

**A curto prazo**:
- Adicionar novos dashboards e relatórios.
- Implementar filtros dinâmicos (por ano, estado, cultura, etc).
- Paginação e ordenação para retornos mais extensos.

**A médio/longo prazo**:
- Evoluir para um microserviço de leitura (CQRS - Command Query Responsibility Segregation).
- Implementar caching de queries agregadas para reduzir carga no banco.
- Gerar pré-aggregaçōes periódicas em background para performance.

Caso o volume de dados e acessos cresça muito, o módulo de Analytics poderá ser migrado para um serviço independente sem impacto no core do sistema.

A documentação do endpoint do modulo pode ser vista no swagger com os demais endpoints.

---

## 🛠️ Como iniciar o projeto via Docker (DEV)

### Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 📦 Passo 1 — Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz:

```dotenv
# Banco de Dados
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=agro_db

DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=agro_db

# Chaves de Criptografia
CRYPTO_SECRET_KEY=... (64 hex)
CRYPTO_IV=... (32 hex)
```

Gere as chaves seguras:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

---

### 🚀 Passo 2 — Subir o ambiente

```bash
docker-compose up -d --build
```

Isso irá:
- Subir o PostgreSQL (`agro-db`)
- Buildar e iniciar a API NestJS (`agro-api`)

---

### ⚙️ O que acontece automaticamente?

| Etapa | Acontecimento |
|:---|:---|
| Banco de dados sobe (Postgres) | ✅ Cria banco agro_db |
| API conecta no banco | ✅ Via TypeORM |
| TypeORM executa migrations | ✅ `migrationsRun: true` |
| NestJS executa SeedService | ✅ Banco populado com dados de DEV |

Sem comandos manuais necessários!

---

### 📊 Dados iniciais gerados automaticamente
- 5 **Producers** 
- Cada producer com 3 **Properties**
- Cada property com 10 **Harvests** 
- Cada harvest com 1 **Crop** aleatório (Café, Soja, Milho, etc.)

---

### 🧪 Passo 3 — Testar a API

Acesse Swagger:
- [`http://localhost:3000/docs`](http://localhost:3000/docs)

Ou teste um endpoint:

```bash
curl -X GET http://localhost:3000/api/producers   -H "Content-Type: application/json"   -H "X-API-Version: 1"
```

---

### 🛑 Como parar o ambiente

```bash
docker-compose down -v 
```

---

## 💎 Qualidade e Convenções

- Entidades em `snake_case` no banco
- Soft delete com `deletedAt`
- DTOs padronizados por operação (Create, Update, Response)
- Uso extensivo de mapeadores (`Mapper`) para transformar entidades em DTOs

---

## 🔐 Segurança
A API aplica boas práticas de segurança essenciais para ambiente público:

- CORS restrito para origens confiáveis
- Helmet para proteção de headers HTTP
- Rate limiting (30 requisições/minuto por IP)
- Validação de input rigorosa via DTOs

---

## 🔐 Criptografia

- `taxId` é criptografado com AES-256
- `taxIdHash` é gerado para evitar duplicidades
- Dados são descriptografados apenas no retorno (no `Mapper`)
- `CryptoService` injetado com `@Injectable()` permite trocas futuras

---

## 📆 Migrações com TypeORM

- Migrations geradas com:

```bash
npm migration:generate
npm migration:run
npm migration:revert
npm migration:show
npm migration:drop
```
---

## 📖 Documentação da API

Swagger disponível em:  
📄 [`http://localhost:3000/docs`](http://localhost:3000/docs)

- Versão da API: enviada via header `X-API-Version: 1`
- Prefixo global: `/api`

---

## 🧪 Testes

- Todos os **use cases** e o **controller** possuem cobertura de testes unitários com Jest.
- Para rodar:

```bash
npm run test
npm run test:watch
npm run test:cov
```

---

## ⚙️ Scripts úteis sem docker

```bash
# Start sem Docker
npm install
npm run start:dev
```

---

## 📬 Requisições via CURL (exemplo)

```bash
curl -X POST http://localhost:3000/api/producers \
  -H "Content-Type: application/json" \
  -H "X-API-Version: 1" \
  -d '{
    "taxId": "12345678900",
    "name": "John Doe"
    "email": "jd@gmail.com"
  }'
```

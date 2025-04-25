
# 🌾 Agro API - Rural Producer Management System

API RESTful para gerenciamento de produtores rurais, propriedades e safras, desenvolvida com **NestJS**, **PostgreSQL**, e arquitetura **Hexagonal (Ports & Adapters)**.  
Foco em boas práticas de engenharia como testes unitários, segurança de dados, versionamento e documentação via Swagger.

---

## 🚀 Tecnologias e Padrões

- **Backend**: NestJS + TypeScript
- **Infraestrutura**: Docker + Docker Compose + PostgreSQL
- **Segurança**: JWT, Criptografia AES-256 para dados sensíveis
- **Documentação**: Swagger (`/docs`)
- **Arquitetura**: Hexagonal (Ports and Adapters)
- **Boas práticas**: SOLID, DRY, KISS, Clean Code
- **Testes**: Unitários com Jest
- **Versionamento**: `X-API-Version` via header HTTP
- **Soft Delete**: Implementado em nível de repositório

---

## 📐 Regras de Negócio Atendidas - Domínio Agro (Crop, Harvest, Property, Producer)

### 1. Permitir o cadastro, edição e exclusão de produtores rurais.
- Os casos de uso `CreateProducerUseCase`, `UpdateProducerUseCase` e `DeleteEntityUseCase` permitem essas operações.
- O `BaseCrudController` expõe os endpoints REST necessários (`POST`, `PUT`, `DELETE`).
- A arquitetura hexagonal isola essas operações no domínio, mantendo regras e persistência desacopladas.

---

### 2.  Validar o CPF ou CNPJ fornecido pelo usuário.
- Os casos de uso `CreateProducerUseCase`, `UpdateProducerUseCase` e `DeleteEntityUseCase` permitem essas operações.
- O `BaseCrudController` expõe os endpoints REST necessários (`POST`, `PUT`, `DELETE`).
- A arquitetura hexagonal isola essas operações no domínio, mantendo regras e persistência desacopladas.

---

### 3. Permitir o registro de várias culturas plantadas por fazenda do produtor.

- A entidade `Crop` possui um `harvestId`.
- A entidade `Harvest` possui um `propertyId` (fazenda).
- Portanto, várias `Crop` podem ser vinculadas à mesma `Harvest`, que pertence à `Property`.

**Relacionamento final:**
```
Producer → Property (1:N)  
Property → Harvest (1:N)  
Harvest → Crop (1:N)
```

---

### 4. Um produtor pode estar associado a 0, 1 ou mais propriedades rurais.

- A entidade `Property` tem o campo `producerId`.
- O relacionamento `Producer` → `Property` é feito via `producerId: UUID (FK)`.
- Não há restrições de quantidade, permitindo 0 ou mais propriedades por produtor.

---

### 5. Uma propriedade rural pode ter 0, 1 ou mais culturas plantadas por safra.

- Cada `Harvest` pertence a uma `Property`.
- Cada `Crop` pertence a uma `Harvest`.
- Isso permite cadastrar múltiplas culturas (`Crop`) para uma mesma safra (`Harvest`) da propriedade.

---

## 🗂️ Estrutura do Banco de Dados (ER)

### 🧾 Entidades

#### Producer
- `id`: UUID (PK)
- `taxId`: string (criptografado)
- `name`: string
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
- `propertyId`: UUID (FK → Property.id)
- `createdAt`: datetime
- `updatedAt`: datetime
- `deletedAt`: datetime \| null (soft delete)


#### Crop
- `id`: UUID (PK)
- `name`: string (ex: Soja, Milho, Café)
- `harvestId`: UUID (FK → Harvest.id)
- `createdAt`: datetime
- `updatedAt`: datetime
- `deletedAt`: datetime \| null (soft delete)

---

### 🔗 Relacionamentos

- Um **Producer** tem 0 ou mais **Properties**
- Uma **Property** tem 0 ou mais **Harvests**
- Uma **Harvest** tem 0 ou mais **Crops**

```
╔════════════════════════════════════════╗
║              Producer                  ║
╠════════════════════════════════════════╣
║ id            UUID          (PK)       ║
║ tax_id        string        (encrypted)║
║ tax_id_hash   string        (hash)     ║
║ name          string                   ║
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
                    ║ id          UUID    (PK)   ║
                    ║ year        int            ║
                    ║ property_id  UUID    (FK)  ║
                    ╚════════════════════════════╝
                              │
                              │ 1:N
                              ▼
                    ╔════════════════════════════╗
                    ║           Crop             ║
                    ╠════════════════════════════╣
                    ║ id         UUID     (PK)   ║
                    ║ name       string          ║
                    ║ harvest_id UUID     (FK)   ║
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

- `CreateEntityUseCase<T>` (abstrato)
- `UpdateEntityUseCase<T>` (abstrato)
- `FindEntityByIdUseCase<T>`
- `FindAllEntitiesUseCase<T>`
- `DeleteEntityUseCase<T>`

Factories são usadas por domínio para instanciar use cases e aplicar lógicas customizadas (ex: `ProducerUseCaseFactory`).

---

### 📂 Estrutura de Pastas (Hexagonal por Módulo)

```
src/
├── application/        # Controllers, Services, Modules
├── domain/             # Entidades, Repositórios, UseCases, DTOs
├── infrastructure/     # Banco de dados, repositórios TypeORM, criptografia
├── shared/             # Use cases e serviços genéricos reutilizáveis

```

---

## 💎 Qualidade e Convenções

- Entidades em `snake_case` no banco
- Soft delete com `deletedAt`
- DTOs padronizados por operação (Create, Update, Response)
- Uso extensivo de mapeadores (`Mapper`) para transformar entidades em DTOs

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

## 🛠️ .env (variáveis sensíveis)

```dotenv
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=agro

CRYPTO_SECRET_KEY=... (64 hex chars)
CRYPTO_IV=... (32 hex chars)
```

> Use a função `crypto.randomBytes(32).toString('hex')` para gerar chaves seguras.

---

## ⚙️ Scripts úteis

```bash
# Start local com Docker
docker-compose up --build

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
  }'
```

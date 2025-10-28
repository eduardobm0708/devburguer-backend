# 🍔 Hamburgueria API

Uma API backend para gerenciamento de uma hamburgueria, com suporte a operações de clientes e administradores. O projeto é focado em escalabilidade, segurança e manutenção, com destaque para atualização de status de pedidos em tempo real e gestão flexível de cardápio.

---

## Descrição

Esta API oferece endpoints para autenticação de usuários, gerenciamento de produtos e categorias, processamento de pedidos e ofertas do dia. Suporta acompanhamento em tempo real do status dos pedidos e controle de acesso por perfil (admin e cliente). O código é modular, utiliza recursos modernos do JavaScript e segue boas práticas para desenvolvimento de APIs.

---

## Técnicas Interessantes

- **Controle de Acesso por Perfil**: Permissões de admin e cliente são aplicadas nos controllers.
- **[Autenticação JWT](https://jwt.io/)**: Autenticação segura e sem estado para os endpoints da API.
- **[Validação de Schemas com Yup](https://github.com/jquense/yup)**: Validação dos dados das requisições usando schemas Yup.
- **[Uploads de Arquivos com Multer](https://github.com/expressjs/multer)**: Gerenciamento de upload de imagens para produtos e categorias.
- **[ORM Sequelize](https://sequelize.org/)**: Abstração das operações e migrações do banco de dados.
- **Hash de Senhas com [bcrypt](https://www.npmjs.com/package/bcrypt)**: Armazenamento seguro das credenciais dos usuários.
- **UUIDs para Identificação de Recursos**: Uso de [uuid](https://www.npmjs.com/package/uuid) para gerar identificadores únicos.
- **Gerenciamento de Variáveis de Ambiente**: Uso de arquivos `.env` para configuração, com template `.env.example` para onboarding.

---

## Bibliotecas e Tecnologias de Destaque

- [Express.js](https://expressjs.com/): Framework web rápido e minimalista para Node.js.
- [Sequelize](https://sequelize.org/): ORM para bancos relacionais.
- [Mongoose](https://mongoosejs.com/): ODM para MongoDB (incluído para flexibilidade, mesmo que não usado em todos os módulos).
- [Yup](https://github.com/jquense/yup): Validação de objetos e schemas.
- [Multer](https://github.com/expressjs/multer): Middleware para manipulação de multipart/form-data.
- [Stripe](https://stripe.com/docs): Integração com Stripe para criação de PaymentIntents e processamento de pagamentos.
 - Certifique-se de definir `STRIPE_SECRET_KEY` no arquivo `.env` para permitir que o servidor crie PaymentIntents.
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken): Autenticação baseada em tokens.
- [bcrypt](https://www.npmjs.com/package/bcrypt): Hash de senhas.
- [uuid](https://www.npmjs.com/package/uuid): Geração de IDs únicos.
- [@biomejs/biome](https://biomejs.dev/): Linter e formatador de código.
- [Nodemon](https://nodemon.io/): Auto-reload do servidor em desenvolvimento.
- [Sucrase](https://github.com/alangpierce/sucrase): Transpilação rápida de ES6+.


---

## Estrutura do Projeto

```
src/
  app/
    controllers/
    middlewares/
    models/
    schemas/
  config/
  database/
  uploads/
.env.example
.gitignore
package.json
README.md
```

- `src/app/controllers/`: Handlers das rotas e lógica de negócio.
- `src/app/middlewares/`: Middlewares customizados, incluindo autenticação.
- `src/app/models/`: Models Sequelize para tabelas do banco.
- `src/app/schemas/`: Schemas Yup para validação.
- `src/config/`: Arquivos de configuração (banco, autenticação, uploads).
- `src/database/`: Inicialização e migrações do banco de dados.
- `src/uploads/`: Diretório para imagens enviadas.
- `.env.example`: Template para variáveis de ambiente.
- `.gitignore`: Arquivos e pastas a serem ignorados pelo Git.

---

## ⚙️ Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/eduardobm0708/devburguer-api-novo.git

# Acesse a pasta
cd devburguer-api-novo

# Instale dependências
npm install

# Copie o exemplo de variáveis de ambiente
cp .env.example .env

# Rode migrations
npx sequelize-cli db:migrate

# Inicie em modo desenvolvimento
npm run dev
```

---

## 📄 Documentação da API

### Exemplo de Endpoint

**Login**
```http
POST /sessions
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "suasenha"
}
```

**Resposta**
```json
{
  "user": {
    "id": 1,
    "name": "Usuário",
    "email": "usuario@email.com"
  },
  "token": "jwt_token_aqui"
}
```

> Para mais exemplos, consulte a documentação dos endpoints ou utilize a collection do Postman.

---

## 👨‍💻 Autor

- **Eduardo Bruno Marquezini**
  [GitHub](https://github.com/eduardobm0708)
  [LinkedIn](https://www.linkedin.com/in/eduardo-bruno-marquezini/)

---

## 📝 Licença

Este projeto está licenciado sob a licença ISC.

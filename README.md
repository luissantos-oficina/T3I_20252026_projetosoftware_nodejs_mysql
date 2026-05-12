# T3I_20252026_projetosoftware_nodejs_mysql
Projeto de Software, utilizando NodeJS, MySQL

## API de Agenda
Este projeto inclui uma API REST em Node.js para gerir eventos de agenda com `data`, `hora`, `assunto` e `descrição`.

### Ficheiros importantes
- `app.js`: servidor Express principal
- `db.js`: ligação ao MySQL
- `routes/events.js`: endpoints CRUD para eventos
- `agenda.sql`: esquema da tabela `events`
- `.env.example`: exemplo de variáveis de ambiente

### Instalação
1. Copie `.env.example` para `.env` e ajuste as credenciais se necessário.
2. Execute `npm install`.
3. Inicie a API com `npm start`.

### Endpoints
- `GET /events` - lista todos os eventos
- `GET /events/:id` - obtém um evento por id
- `POST /events` - cria um novo evento
- `PUT /events/:id` - atualiza um evento existente
- `DELETE /events/:id` - apaga um evento

### Exemplo de `POST /events`
```json
{
  "event_date": "2026-05-20",
  "event_time": "14:00:00",
  "subject": "Reunião",
  "description": "Discussão do projeto",
  "status": "pending"
}
```

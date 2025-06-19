# PUG EJS

Цей проєкт демонструє інтеграцію двох різних шаблонізаторів у один Express-сервер:
- Pug використовується для відображення сторінок /users та /users/:username
- EJS використовується для відображення сторінок /articles та /articles/:articleId

## Запуск
```bach
npm run dev
```

## Технології
- Node.js + Express
- Pug (для /users)
- EJS (для /articles)
- CSS (у файлі /public/style.css)
- express-session
- express middleware (auth, logger, errorHandler)

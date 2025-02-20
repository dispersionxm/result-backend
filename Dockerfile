# Используем минимальный образ Node.js на базе Alpine
FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json отдельно (чтобы кешировать слои)
COPY package*.json ./

# Устанавливаем только продакшен-зависимости
RUN npm install --omit=dev && npm cache clean --force

# Копируем остальные файлы
COPY . .

# Открываем порт
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]

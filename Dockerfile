# Użyj oficjalnego obrazu Node.js
FROM node:18-alpine

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package.json package-lock.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj pozostałe pliki projektu
COPY . .

# Zbuduj aplikację Next.js
RUN npm run build

# Otwórz port aplikacji
EXPOSE 3000

# Uruchom aplikację
CMD ["npm", "start"]

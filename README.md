# 🎵 Sortify

Sortify is a web application that helps you sort your Spotify playlists with ease.

This project consists of two parts:
- `backend`: A Spring Boot application (Java 21)
- `frontend`: An Angular application

---

## 📚 API Documentation

Swagger UI is available at:  
👉 [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Maven (`mvn`) or use the provided wrapper (`./mvnw`)
- Node.js + npm
- Angular CLI (`npm install -g @angular/cli`)
- Spotify API credentials (Client ID & Secret)

---

### 🖥️ Running the Backend

```bash
cd backend
```

From the **backend directory**, run:

```bash
./mvnw spring-boot:run -pl backend
```

Or, if Maven is installed globally:

```bash
mvn spring-boot:run -pl backend
```

> Entry point: `com.mcalihe.sortify.SortifyApplication`

Once started, the API will be available at:
- Swagger: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

### 💻 Running the Frontend

From the `frontend/` folder:

```bash
cd frontend
npm install
ng serve
```

Angular dev server will start on:  
[http://localhost:4200](http://localhost:4200)

---

### 🔐 Environment Variables

You need to provide the following environment variables for the Spotify integration:

- `sortify.auth.clientId`
- `sortify.auth.loginUrl`
- `sortify.auth.redirectUrl`
- `sortify.auth.tokenEndpoint`
- `sortify.auth.scopes`

(Configure them via `application.properties`)

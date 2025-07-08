# Carpool Nest Backend

This project is the backend system for a carpooling application, built with [NestJS](https://nestjs.com/), TypeScript, Postgres and typeORM . It was originally developed as a monolith and is designed for seamless transition to microservices as system demand grows.

-----

## Features

- Modern NestJS/TypeScript stack
- PostgreSQL database with TypeORM for robust relational data handling
- JWT-based authentication & authorization
- Carpool ride management (creation, joining, tracking)
- User management (registration, profiles)
- Payment integration (Stripe/PayPal-ready)
- Scalable codebase, architected for future microservice extraction

---

## Project Setup

```bash
git clone https://github.com/Faruq-Hameed/carpool-nest-backend.git
cd carpool-nest-backend
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```
DATABASE_URL=postgres://username:password@localhost:5432/carpool
JWT_SECRET=your_jwt_secret
# Add other variables as needed
```

---

## Running the Application

```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

---

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

---

## Architecture

The system is currently a monolith but is pre-structured for future microservice scaling.

### Hybrid REST + gRPC Architecture

```
[Client (Mobile/Web)]
    |
    | REST API / WebSockets (Real-time)
    v
[NestJS API Gateway]
    |
    | (future: gRPC for internal communication)
    v
[Go Ride Matching Service] — gRPC — [Python AI Service]
    |
[PostgreSQL DB]
```

- **REST API:** Communication between clients and backend (NestJS).
- **gRPC:** Planned for fast, efficient backend service-to-service communication.
- **WebSockets:** For real-time ride tracking.

#### Service Breakdown (Future Microservices)

| Service           | Tech Stack                  | Purpose                                    |
|-------------------|----------------------------|--------------------------------------------|
| API Gateway       | NestJS + TypeScript        | Auth, requests, payments                   |
| Ride Matching     | Go + gRPC + PostgreSQL     | Finds best driver for passenger            |
| Route Optimization| Python + TensorFlow        | AI-powered route & ETA optimization        |
| Notifications     | NestJS + Firebase          | SMS, push notifications                    |
| Payments          | NestJS + Stripe/PayPal     | Processes ride payments                    |
| Ride Tracking     | WebSockets (NestJS)        | Real-time driver tracking                  |

#### Database Example (`rides` table)
```sql
CREATE TABLE rides (
    id SERIAL PRIMARY KEY,
    passenger_name VARCHAR(100),
    driver_id INT,
    origin_lat FLOAT,
    origin_long FLOAT,
    destination_lat FLOAT,
    destination_long FLOAT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    distance FLOAT,
    fare FLOAT
);
```

---

## Available API Endpoints

### Auth

- `POST /auths` — Register a new user
- `POST /auths/login` — User login
- `POST /auths/forget-password` — Request password reset
- `POST /auths/otp-login` — OTP-based login
- `GET /auths/check-user` — Check user existence
- `POST /auths/emit-login` — Emit login event

### Rides

- `POST /rides/match` — Book a ride (request matching)
- `GET /rides/{id}/history` — Get ride history by user/ride
- `POST /rides/{id}/complete` — Complete a ride

### Payments

- `POST /payments/pay` — Make a payment for a ride

### WebSockets

- Real-time GPS updates:  
  - Driver: `socket.emit("updateLocation", { driverId, lat, long })`
  - Passenger: `socket.on("location_1", (data) => {...})`

---

## Project Structure

- `src/`  
  Main application code (modules, controllers, services, entities)
- `test/`  
  Automated tests

---

## Deployment

See the [NestJS deployment docs](https://docs.nestjs.com/deployment) for best practices.

---

## Future Plans

- Extract core modules into microservices as demand scales.
- Add advanced ride-matching, payment, and notification features.

---

## Contributing

Pull requests and contributions are welcome! Open an issue first to discuss ideas or improvements.

---

## License

[Specify your license here]

---

*Maintained by [Faruq-Hameed](https://github.com/Faruq-Hameed).*

# Common Errors & Solutions

## Backend Startup Errors

### Error: "Cannot find module... reflect-metadata"
**Solution**: Ensure imports are correct in `main.ts`:
```typescript
import 'reflect-metadata';
```
Make sure this is the FIRST import.

### Error: "Port 3000 already in use"
**Solution**: 
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill it (Windows)
taskkill /PID <PID> /F

# Or change port in .env.local
PORT=3001
```

### Error: "Cannot connect to PostgreSQL"
**Solution**:
1. Verify PostgreSQL is running:
   ```bash
   psql -U postgres -c "SELECT version();"
   ```
2. Check `.env.local` DATABASE_URL matches your setup
3. Ensure database `nexora` exists:
   ```bash
   psql -U postgres -c "CREATE DATABASE nexora;"
   ```

### Error: "ValidationPipe not working"
**Solution**: Ensure DTOs have proper decorators:
```typescript
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;
}
```

---

## Frontend Startup Errors

### Error: "ng: command not found"
**Solution**: Install Angular CLI globally or use npx:
```bash
npx ng serve
# or
npm install -g @angular/cli@17
ng serve
```

### Error: "Port 4200 already in use"
**Solution**:
```bash
# Use different port
ng serve --port 4201

# Or find and kill the process
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

### Error: "Module not found: @angular/common"
**Solution**: Install missing dependencies:
```bash
cd apps/web
npm install
```

### Error: "Cannot find signal, computed, effect"
**Solution**: Make sure using Angular 16+:
```bash
ng version
# Should show @angular/core: ^17.0.0 or higher
```

### Error: "Tailwind CSS not working"
**Solution**: Rebuild Tailwind:
```bash
npm run build
```

---

## Build Errors

### NestJS: "@nestjs/core not found"
**Solution**:
```bash
cd apps/api
npm install
npm run build
```

### Angular: "Type error: Cannot assign to read-only property"
**Solution**: Ensure TypeScript strict mode compatibility:
```bash
cd apps/web
npm install
```

---

## Quick Fixes Checklist

- [ ] Delete `node_modules` and `.package-lock.json`
- [ ] Run `npm install` in both `apps/api` and `apps/web`
- [ ] Check `.env.local` files exist with correct values
- [ ] Kill any processes using ports 3000 and 4200
- [ ] On Windows: Open PowerShell as Administrator if permissions issues
- [ ] Clear browser cache (Ctrl+Shift+Delete in Chrome)

---

## Test Connection

### Backend Health Check
```bash
curl http://localhost:3000/api/v1/users/me
# Should return user object or 401 Unauthorized (expected)
```

### Frontend Loading
Open http://localhost:4200 - should show landing page with NEXORA header.

---

## Detailed Logs

### Backend Debug Mode
```bash
cd apps/api
LOG_LEVEL=debug npm run start:dev
```

### Frontend Debug Mode
```bash
cd apps/web
ng serve --verbose
```

---

## Still Having Issues?

1. Make sure PostgreSQL is installed and running
2. Verify all files have been created (check folder structure in [ARCHITECTURE.md](ARCHITECTURE.md))
3. Check that ports 3000 and 4200 are available
4. Run setup scripts: `bash setup-unix.sh` or `setup-windows.bat`
5. Delete `node_modules` in both apps and reinstall

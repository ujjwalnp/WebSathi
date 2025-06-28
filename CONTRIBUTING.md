# 🤝 Contributing Guide — WebSathi SaaS  
Welcome to the team! This guide helps you follow a **standardized workflow** to keep the codebase clean, maintainable, and scalable.  

## 🧩 Project Structure Reminder  
```
apps/  
├── web/         → Frontend (Next.js)  
├── api/         → Backend (Express/Bun)  
prisma/          → DB schema  
```

## ✅ Step-by-Step Contribution Process  
### 1. 📦 Pull Latest Code  
```
git checkout main  
git pull origin main  
```
### 2. 🌱 Create a New Branch (Feature/Task)  
Follow this strict naming format:  
```
feat/client/add-clerk-auth  
feat/server/add-clerk-auth  
fix/client/fix-login-bug  
refactor/shared/update-database-layer  
chore/setup/update-dependencies  
```
```
> 🔖 Format: type/scope/short-description  
```

```
| Type      | Meaning                       |  
|-----------|-------------------------------|  
| feat      | New feature                   |  
| fix       | Bug fix                       |  
| refactor  | Refactoring only (no feature) |  
| chore     | Tooling, config, or cleanup   |  
| docs      | Markdown/docs changes         |  
|           |                               |
| Scope     | Meaning                       |  
|-----------|-------------------------------|  
| client    | Frontend (Next.js)            |  
| server    | Backend (Express/Bun)         |  
| shared    | Common packages               |  
| setup     | Project-wide config/tooling   |  
```

### 3. ✍️ Make Conventional Commits  
Use [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) messages:  
Examples:  
```
feat/client/add-clerk-auth  
fix/server/fix-stripe-webhook  
refactor/shared/update-prisma-schema  
```
Each commit message should match the branch and describe the change clearly.  

### 4. 🚀 Push to Remote  
```
git push origin feat/client/add-clerk-auth  
```

### 5. ✅ Maintainers Will:  
- Review your PR  
- Suggest changes if needed  
- Merge and delete the branch after review  

## ❗ Rules to Follow  
- ✅ Follow Conventional Commits and branch naming  
- ✅ Keep PRs focused on a single task  
- ✅ Write clean, scalable code (avoid hacks)  
- ❌ Never commit secrets in .env  
- ❌ Never push to main directly  

## 🧠 Tips for High-Quality Code  
- Use aliases like @web, @api instead of deep ../../ imports  
- Break large components/services into modules  
- Don’t skip types — write proper TypeScript  
- Keep functions pure when possible  
- Write reusable, clean code  

## 🙏 Thanks for keeping this project clean & collaborative!  
If in doubt, ask the maintainers.

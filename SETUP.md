## Configuração do Supabase
1. Crie um projeto em supabase.com
2. Em Project Settings > API, copie URL, anon key e service_role key
3. Cole no `.env.local`
4. Acesse http://localhost:3000/api/health para validar a conexão
5. Gere os tipos do banco com: npm run db:types
   (antes, substitua PROJECT_ID em package.json pelo ID do seu projeto)

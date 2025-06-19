# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy no Coolify

1. Faça o build do projeto:
   `npm run build`
2. Configure o Coolify para servir a pasta `dist` como site estático.
3. Certifique-se de que os arquivos `_headers` e `_redirects` estejam presentes na pasta `dist` após o build.
4. Configure o domínio customizado e ative HTTPS no painel do Coolify.
5. Assegure-se que as seguintes políticas de segurança estejam ativas:
   - HTTPS obrigatório
   - Content Security Policy (CSP)
   - Strict-Transport-Security (HSTS)
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin

Essas configurações aumentam a segurança do seu deploy em produção.

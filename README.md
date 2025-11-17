# LingoSite: Multilingual Website SaaS Platform

LingoSite is an AI-powered SaaS platform enabling users such as NGOs, educators, content creators, small business, startups to effortlessly create multilingual websites, landing pages, and web apps with zero coding or translation burden. The platform leverages Lingo Products(Compiler,CLI) and large language models (LLMs) to generate and translate site content automatically, making multilingual publishing seamless and accessible.

***

## 🌍 Live Website  
[https://lingosite.vercel.app/](https://lingosite.vercel.app/)

## 🎥 Demo Video  
[https://youtu.be/8BPkrrkW6tU?si=jszDOCaRKsSZDGsa](https://youtu.be/8BPkrrkW6tU?si=jszDOCaRKsSZDGsa)

***

## 🚀 Core Features

- AI-driven content generation from user prompts via LLM
- Seamless Lingo-powered multi-language translation of all site content
- JSX UI component generation by LLM, then translated by Lingo Compiler
- Generated site JSX stored in database keyed by unique site code
- Publicly accessible sites served at unique routes, e.g. `/site/[site-code]`
- Modern, responsive UI with Next.js App Router and React Hooks
- Fully deployable on Vercel with built-in backend API routes

***

## 🧰 How It Works: SaaS Multilingual Site Generation

1. Users create site content in their primary language using prompts.
2. An LLM generates the JSX structure for the site UI based on the content.
3. The entire JSX code is translated into the desired language by the Lingo translation API, ensuring all text and UI elements are localized.
4. The translated JSX is stored in the platform's database, accessible via a unique site code.
5. Each generated site is publicly viewable via a unique URL route like `/site/zqdgdja`.
6. Users can share, view, and navigate these multilingual websites effortlessly.

***

## 🧠 Tech Stack

| Category        | Technology                  |
|-----------------|-----------------------------|
| Framework       | Next.js 54 (App Router)     |
| Styling         | Tailwind CSS                |
| AI & Translation| Lingo / Custom AI API   |
| Deployment      | Vercel                     |
| Database        | Supabase      |

***

## ⚙️ Installation & Setup

Clone repository:

```sh
git clone https://github.com/your-username/lingosite.git
cd lingosite
```

Install dependencies:

```sh
npm install
```

Create `.env.local` file with keys:

```
NEXT_PUBLIC_LINGO_API_KEY=your_key_here
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

Run development mode:

```sh
npm run dev
```

Build production version:

```sh
npm run build
```

Start production server:

```sh
npm start
```

***

## 📁 Project Structure

```
/
├── app/
│   ├── api/
│   ├── components/
│   └── page.jsx
├── public/
└── package.json
```

***

## 🧪 Roadmap & Future Enhancements

- Export options: PDF, text, audio formats for content
- AI-powered voice generation for songs and lessons
- Classroom/collaborative editing and viewing mode
- Website builder improvements with drag-and-drop UI
- Expanded deployment capabilities including custom subdomains and translation workflows

***

## 🤝 Contribution Guidelines

Contributions, ideas, and improvements are welcome! To contribute:

```sh
git checkout -b feature-name
# make your updates
git commit -m "Add new feature"
git push origin feature-name
```

***

## 📜 License

This project is licensed under the **MIT License**.

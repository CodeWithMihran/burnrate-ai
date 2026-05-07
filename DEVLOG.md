## Day 1 — 2026-05-06

**Hours worked:** 2

**What I did:**
Started working on the assignment around 10:00 PM today. First I went through the whole Credex assignment properly again to understand what exactly they are expecting, because it’s not just coding. After that I finalized my tech stack (MERN with TypeScript) and created the complete folder structure for both frontend and backend.

Initially my structure was simple but then I realized audit logic should be on backend, so I restructured everything again properly. After that I installed all required packages for both client and server side (express, mongoose, typescript, testing libs, tailwind etc).

Then I worked on creating the main database models. I completed the **Audit model** with all fields like tools input, results, savings, publicId etc. Also created the **Lead model** which includes email, audit reference and high value lead tracking.

**What I learned:**
Today I understood that this project is more about thinking and product building, not just coding. The audit engine is going to be the most important part. Also learned how to design models in a more real-world way instead of basic schemas.

**Blockers / what I'm stuck on:**
Not exactly stuck but I’m still not fully clear on how to design the audit logic properly with real pricing comparisons and solid reasoning. That part feels a bit complex right now.

**Plan for tomorrow:**
Start working on audit engine logic. First I will define pricing data for tools like ChatGPT and Claude and then try to build basic rules for recommendation and savings calculation. Also will start setting up express server and routes.

----------------------------------------------------------------------------------------------------------------------------------

## Day 2 — 2026-05-07

**Hours worked: 6**

**What I did:**
Today I mostly focused on building the actual backend structure and then started frontend development for BurnRate.ai. First I completed all major backend parts like controllers, routes and audit engine improvements. I created audit, lead and summary controllers and connected them properly with routes. Also shifted the server structure into a cleaner src based architecture because earlier things were getting messy.

After backend structure looked stable, I started frontend setup using React + TypeScript + Tailwind. I created the shared layout first including Navbar, Footer, App routes and global styles. Then I designed the Home page with a premium landing page style UI and gradients/glassmorphism effects.

After that I worked on the Audit page which took a lot more time than expected because I wanted the form flow and UX to feel smooth instead of just making a basic form. Added dynamic tool inputs, loading state and proper layout for audit generation.
Then I also completed the SharedResult page design with savings hero section, recommendations cards, AI summary section and metrics cards. Finally I started frontend-backend integration by creating service files for API calls and updating the pages to use real backend data instead of static mock data.

**What I learned:**
Today I learned how important frontend flow and UX actually is in product based projects. Even small things like spacing, loading states and route flow makes the app feel much more real. Also understood better how to separate API logic into service files instead of directly calling backend inside components.

**Blockers / what I'm stuck on:**
Frontend and backend integration still feels slightly confusing in some places, especially matching backend response structure with frontend state properly. Also need to carefully test routes and data flow because one small mismatch breaks the whole flow.

**Plan for tomorrow:**
Finish full integration testing between frontend and backend. Add proper error handling, toast notifications and maybe email gate flow if time allows. Also want to clean small UI issues and start preparing documentation files properly.
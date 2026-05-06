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

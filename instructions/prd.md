Twitter AI 生成推文 Web 应用 - PRD（产品需求文档）
1. App Overview
产品名称：TweetGenix（暂定）
目标：为startup founder、investor、crypto KOL等个人用户提供一个简单易用的工具，通过AI快速生成自然推文，提升Twitter账号的曝光量（engagement rate和view）。
目标用户：技术小白用户，初期为自己使用，后续推广给更多个人用户。
上线时间：1-2周内推出MVP。
成功标准：生成的推文能显著提升用户的Twitter engagement rate和view，否则视为失败。
2. User Flow
用户访问Web应用，在界面上输入：
一个生成提示（例如“分享一个创业小技巧”）。
一个参考Twitter推文（例如“
@elonmusk的推文直接复制过来作为参考
”）。
选择推文字数范围（短、中、长）。
使用Gemini 2.0 Flash生成一条推文，展示给用户。
用户查看生成的推文，可直接编辑文本。
用户选择：
保存：将推文存入历史记录。
复制：将推文复制到剪贴板，用户手动粘贴到Twitter发布。
用户可在历史记录中查看之前保存的推文。
3. Tech Stack & APIs
前端+后端：Next.js（v15.x），使用App Router和Server Components。
UI：shadcn/ui（基于Tailwind v4），极简设计。
AI：Gemini 2.0 Flash（通过Google AI SDK，参考https://ai.google.dev/gemini-api/docs）。
数据库：Supabase（免费层，用于存储推文历史）。
部署：Vercel（免费层）。
4. Core Features
推文生成：
用户输入生成提示和参考Twitter tweets。
系统基于参考推文风格，使用Gemini 2.0 Flash生成1条推文。
默认风格为casual（类似startup founder的轻松、接地气口吻，避免AI感）。
支持用户选择字数范围：
短：50-100字符
中：100-200字符
长：200-280字符
推文编辑：
用户可对生成的推文进行简单文本修改。
保存历史：
将生成的推文保存到Supabase，包括内容、生成时间和字数范围。
推文复制：
用户可一键复制生成的推文到剪贴板，自行粘贴到Twitter发布。
5. In-scope and Out-of-scope
In-scope（MVP包含的功能）：
单条推文生成。
基本文本编辑。
保存推文历史。
一键复制推文。
Out-of-scope（MVP不包含的功能）：
批量生成多条推文。
高级编辑功能（如添加图片、链接）。
用户登录或认证系统。
直接发布到Twitter（OAuth已移除）。
推文效果反馈机制。
6. Non-functional Requirements
界面：极简设计，使用shadcn/ui组件（包括输入框、按钮、结果展示区）。
性能：推文生成时间控制在5秒以内。
预算：全程使用免费技术栈：
Gemini 2.0 Flash（免费额度，每天100次请求）。
Vercel和Supabase的免费层。
伦理：无需考虑AI生成内容的伦理问题。
7. Constraints & Assumptions
Constraints（限制条件）：
Gemini 2.0 Flash免费额度限制（每天100次请求，每分钟10次）。
Vercel免费层有带宽和执行时间限制。
无法直接发布推文，依赖用户手动粘贴。
Assumptions（假设）：
用户愿意手动复制粘贴到Twitter。
Gemini 2.0 Flash的免费额度足够支持MVP初期使用。
8. Known Issues & Potential Pitfalls
Gemini免费额度不足：
问题：每日100次请求可能不够多用户使用。
缓解：限制每日生成次数（例如50次/天），超出时提示用户。
手动发布不便：
问题：用户可能觉得复制粘贴麻烦。
缓解：界面提供清晰的“复制成功”提示，确保操作简单。
推文质量不佳：
问题：生成的推文可能不够吸引人，影响曝光量。
缓解：后续迭代优化生成提示模板和风格分析逻辑。
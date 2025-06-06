export default async function handler(req, res) {
  const { title } = req.body;

  const systemPrompt = \`你是一位资深的学术论文写作助手，请根据论文题目：\${title}，输出一份包含完整章节和子标题的HTML目录结构。\`;

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "请开始生成目录。" }
      ],
      temperature: 0.3
    })
  });

  const data = await openaiRes.json();
  res.status(200).json(data);
}
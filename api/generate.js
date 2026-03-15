export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { level } = req.body;
  if (!['N1', 'N2', 'N3', 'N4'].includes(level)) {
    return res.status(400).json({ error: 'Invalid level' });
  }

  const levelDesc = {
    N1: "최고급 JLPT N1 수준의 어려운 한자어, 고유어, 추상적 개념 단어",
    N2: "JLPT N2 수준의 일상적이지만 고급스러운 어휘",
    N3: "JLPT N3 수준의 중급 일상 회화 단어",
    N4: "JLPT N4 수준의 기초~초급 일상 단어",
  };

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `당신은 JLPT 일본어 학습 도우미입니다. 요청한 레벨에 맞는 단어를 JSON 형식으로만 반환하세요. 다른 텍스트는 절대 포함하지 마세요.

JSON 형식:
{
  "kanji": "漢字表記",
  "reading": "よみかた",
  "meaning_kr": "한국어 뜻",
  "meaning_en": "English meaning",
  "type": "명사/동사/형용사/부사 중 하나",
  "example_jp": "例文（日本語）",
  "example_kr": "예문 한국어 번역",
  "memory_tip": "외우기 쉬운 암기 팁 (한국어, 1-2문장)"
}`,
        messages: [
          {
            role: 'user',
            content: `${level} 레벨 (${levelDesc[level]}) 단어를 1개 랜덤 생성해주세요. 이미 흔히 알려진 단어 말고 다양한 단어를 골고루 선택해주세요.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const text = data.content.map((i) => i.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const word = JSON.parse(clean);
    word.level = level;

    return res.status(200).json(word);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: '단어 생성에 실패했습니다.' });
  }
}

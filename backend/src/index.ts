import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});

// app.post('/api/recipe', async (req, res) => {
//   const prompt = req.body.prompt;

//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful cooking assistant. Return JSON only.' },
//         { role: 'user', content: `Generate a recipe for: ${prompt}` }
//       ],
//       temperature: 0.7,
//       max_tokens: 1000
//     });

//     const content = completion.choices[0]?.message?.content || '';
//     let recipe;
//     try {
//       const match = content.match(/\{[\s\S]*\}/);
//       recipe = match ? JSON.parse(match[0]) : {
//         title: `Recipe for: ${prompt}`,
//         ingredients: ["Ingredient 1", "Ingredient 2"],
//         steps: ["Step 1", "Step 2"]
//       };
//     } catch {
//       recipe = {
//         title: `Recipe for: ${prompt}`,
//         ingredients: ["Ingredient 1", "Ingredient 2"],
//         steps: ["Step 1", "Step 2"]
//       };
//     }

//     res.json(recipe);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'OpenAI request failed' });
//   }
// });

// Fake /api/recipe handler
app.post('/api/recipe', (req, res) => {
    const prompt = req.body.prompt.toLowerCase();

    // Simple fallback recipes
    const recipes: { [key: string]: { title: string; ingredients: string[]; steps: string[] } } = {
        pasta: {
            title: 'Classic Spaghetti Aglio e Olio',
            ingredients: ['400g spaghetti', '4 cloves garlic', 'Olive oil', 'Red pepper flakes', 'Parsley', 'Salt & pepper'],
            steps: ['Boil pasta', 'Cook garlic in oil', 'Add pasta', 'Toss with parsley & seasoning', 'Serve hot']
        },
        chicken: {
            title: 'Lemon Herb Roasted Chicken',
            ingredients: ['4 chicken breasts', 'Lemon juice', 'Olive oil', 'Garlic', 'Oregano', 'Salt & pepper'],
            steps: ['Preheat oven', 'Mix marinade', 'Coat chicken', 'Roast 25-30 min', 'Serve hot']
        }
    };

    const recipe = recipes[prompt] || {
        title: `Custom ${prompt} Recipe`,
        ingredients: ['Main ingredient', 'Seasoning', 'Oil or butter', 'Salt & pepper'],
        steps: ['Prepare ingredients', 'Cook however you like', 'Season', 'Serve & enjoy']
    };

    res.json(recipe);
});


app.get('/', (req, res) => {
  res.send('Backend is running! Use POST /api/recipe to get a recipe.');
});

app.listen(3000, () => {
  console.log('Backend running at http://localhost:3000');
});

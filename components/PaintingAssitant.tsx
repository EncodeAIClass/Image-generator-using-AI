import { useState } from 'react';
import { openaiClient } from '../utils/openai';

const PaintingAssistant = () => {
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value);
    };

    const generatePainting = async () => {
        try {
        const prompt = `Describe a painting with the theme of "${theme}" in detail, including information about its elements, style, colors, and other notable details.`;
        const response = await openaiClient.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 500,
            n: 1,
            stop: null,
            temperature: 0.7,
        });

        setDescription(response.data.choices[0].text.trim());
        } catch (error) {
        console.error('Error generating painting description:', error);
        }
    };

    return (
        <div>
        <h2>Painting Assistant</h2>
        <label>
            Painting Theme:
            <select value={theme} onChange={handleThemeChange}>
            <option value="">Select a theme</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="abstract">Abstract</option>
            <option value="still life">Still Life</option>
            </select>
        </label>
        <button onClick={generatePainting}>Generate Painting Description</button>
        {description && (
            <div>
            <h3>Painting Description:</h3>
            <p>{description}</p>
            </div>
        )}
        </div>
    );
    };

export default PaintingAssistant;
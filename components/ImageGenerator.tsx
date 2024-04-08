import { useState } from 'react';
import { openaiClient } from '../utils/openai';

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [size, setSize] = useState('512x512');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSize(e.target.value);
    };

    const generateImage = async () => {
        try {
        setLoading(true);
        const response = await openaiClient.createImage({
            prompt,
            n: 1,
            size,
        });

        setImage(response.data.data[0].url);
        setLoading(false);
        } catch (error) {
        console.error('Error generating image:', error);
        setLoading(false);
        }
    };

    return (
        <div>
        <h2>Image Generator</h2>
        <label>
            Prompt:
            <input type="text" value={prompt} onChange={handlePromptChange} />
        </label>
        <label>
            Size:
            <select value={size} onChange={handleSizeChange}>
            <option value="256x256">256x256</option>
            <option value="512x512">512x512</option>
            <option value="1024x1024">1024x1024</option>
            </select>
        </label>
        <button onClick={generateImage}>Generate Image</button>
        {loading && <div>Loading...</div>}
        {image && (
            <div>
            <h3>Generated Image:</h3>
            <img src={image} alt="Generated" />
            </div>
        )}
        </div>
    );
};

export default ImageGenerator;
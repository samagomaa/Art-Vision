import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext.jsx";

export default function Cartoon() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  let { userToken } = useContext(UserContext);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setGeneratedImage(null);

    try {
      const response = await axios.post(
        `https://bambii-03-art-vision-cartoon-generator.hf.space/generate_cartoon`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: "application/json",
          },
        }
      );

      const base64Image = response.data.image_base64;
      const imageUrl = `data:image/png;base64,${base64Image}`;
      setGeneratedImage(imageUrl);
      console.log(response);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-white fw-bold">
        Art Cartoon Generator
      </h2>
      <div className="mb-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="form-control"
          placeholder="Prompt..."
        />
      </div>
      <div className="text-center">
        <button
          onClick={handleGenerate}
          className="btn btn-warning fw-bold text-white"
          disabled={loading}
        >
          {loading ? "Generating..." : "Image generation"}
        </button>
      </div>

      {generatedImage && (
        <div className="text-center mt-4">
          <img
            src={generatedImage}
            alt="Generated"
            className="img-fluid rounded"
          />
        </div>
      )}
    </div>
  );
}

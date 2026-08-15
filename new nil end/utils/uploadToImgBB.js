const axios = require("axios");

const uploadToImgBB = async (file) => {
  if (!file) {
    throw new Error("Image file is required");
  }

  if (!process.env.IMGBB_API_KEY) {
    throw new Error("IMGBB_API_KEY is not configured");
  }

  const base64Image = file.buffer.toString("base64");

  const formData = new URLSearchParams();

  formData.append("key", process.env.IMGBB_API_KEY);
  formData.append("image", base64Image);

  const response = await axios.post(
    "https://api.imgbb.com/1/upload",
    formData.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!response.data.success) {
    throw new Error("ImgBB image upload failed");
  }

  return response.data.data.url;
};

module.exports = uploadToImgBB;
import axios from "axios";

export const readBlob = async (req, res) => {
  const startTime = Date.now();

  if (!req.body || !req.body.blobID) {
    return res.status(400).json({
      error: "Invalid request",
      details: "Missing required field: blobID",
      metrics: {
        durationInSeconds: (Date.now() - startTime) / 1000,
      },
    });
  }

  try {
    const AGGREGATOR = process.env.AGGREGATOR;
    if (!AGGREGATOR) {
      throw new Error("AGGREGATOR environment variable is not configured");
    }

    const { blobID } = req.body;

    if (typeof blobID !== "string" || !blobID.trim()) {
      throw new Error("Invalid blobID format");
    }

    const response = await axios.get(`${AGGREGATOR}/v1/blobs/${blobID}`);

    const duration = (Date.now() - startTime) / 1000;

    return res.status(200).json({
      data: response.data,
      metrics: {
        durationInSeconds: duration,
      },
    });
  } catch (error) {
    const duration = (Date.now() - startTime) / 1000;

    // Determine appropriate status code based on error type
    const statusCode = error.response?.status || 500;

    console.error("Error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return res.status(statusCode).json({
      error: "Failed to read data from Walrus",
      details: error.message,
      metrics: {
        durationInSeconds: duration,
      },
    });
  }
};

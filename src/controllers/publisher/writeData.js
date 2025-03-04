import { promises as fs } from "fs";
import axios from "axios";

export const writeDataFile = async (req, res) => {
  const startTime = Date.now();

  try {
    const PUBLISHER = process.env.PUBLISHER;
    console.log("Starting to read file...");
    const ADDRESS = process.env.ADDRESS;
    const epochs = 90;

    const jsonData = await fs.readFile(
      "/home/ashwin/large_file_50MB.json",
      "utf8"
    );
    const fileSizeKB = Buffer.byteLength(jsonData, "utf8") / 1024;

    console.log(`Successfully read file. Size: ${fileSizeKB.toFixed(2)} KB`);
    console.log("Publisher URL:", PUBLISHER);

    console.log("Sending request to Walrus...");
    // const response = await axios.put(
    //   `${PUBLISHER}/v1/blobs?send_object_to=${ADDRESS}&epochs=${epochs}`,
    //   jsonData,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     maxContentLength: Infinity, //  to handle large files
    //     maxBodyLength: Infinity, // to handle large files
    //   }
    // );

    const baseUrl = PUBLISHER.startsWith("http")
      ? PUBLISHER
      : `http://${PUBLISHER}`;

    const response = await axios.put(
      `${baseUrl}/v1/blobs?&epochs=${epochs}&deletable=true`,
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        maxContentLength: Infinity, //  to handle large files
        maxBodyLength: Infinity, // to handle large files
      }
    );

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log(`Request completed successfully in ${duration} seconds`);

    res.status(200).json({
      data: response.data,
      metrics: {
        durationInSeconds: duration,
        fileSize: fileSizeKB,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.error("Error details:", {
      message: error.message,
      response: error.response?.data, //  response error if it exists
      status: error.response?.status,
    });

    res.status(500).json({
      error: "Failed to write data to Walrus",
      details: error.message,
      metrics: {
        durationInSeconds: duration,
        timestamp: new Date().toISOString(),
      },
    });
  }
};

export const writeDataString = async (req, res) => {
  try {
    const PUBLISHER = process.env.PUBLISHER;
    const ADDRESS = process.env.ADDRESS;
    const data = "testingggData";
    const epochs = 90;

    const baseUrl = PUBLISHER.startsWith("http")
      ? PUBLISHER
      : `http://${PUBLISHER}`;

    // const response = await axios.put(
    //   `${PUBLISHER}/v1/blobs?send_object_to=${ADDRESS}&epochs=${epochs}`,
    //   data,
    //   {
    //     headers: {
    //       "Content-Type": "text/plain",
    //     },
    //   }
    // );

    const response = await axios.put(
      `${baseUrl}/v1/blobs?&epochs=${epochs}`,
      data,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error writing data:", error);
    res.status(500).json({
      error: "Failed to write data to Walrus",
      details: error.message,
    });
  }
};

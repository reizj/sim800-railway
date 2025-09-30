import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post("/data", async (req, res) => {
  try {
    console.log("Received from SIM800L:", req.body);

    const { device_id, smoke1, smoke2, flame1, flame2 } = req.body;

    const { data, error } = await supabase.from("device_data").insert([
      { device_id, smoke1, smoke2, flame1, flame2 },
    ]);

    if (error) throw error;

    res.json({ status: "saved", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

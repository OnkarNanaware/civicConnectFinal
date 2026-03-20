import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

async function getSummary(complaint2) {
  try {
    const response = await fetch("http://127.0.0.1:5000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaint: complaint2 }),
    });

    const text = await response.text();
    if (!response.ok) {
        console.error("Backend error response:", text);
        return "Manual Summary Required";
    }

    const data = JSON.parse(text);
    return data.summary || "Summary generation failed";
  } catch (error) {
    console.error("Fetch summary error:", error);
    return "Error getting summary";
  }
}

async function getMinistry(title, description) {
  try {
    const response = await fetch("http://127.0.0.1:5000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, description: description }),
    });

    const text = await response.text();
    if (!response.ok) {
        console.error("Backend classification error:", text);
        return "None";
    }

    const data = JSON.parse(text);
    return data.ministry || "None";
  } catch (error) {
    console.error("Fetch ministry error:", error);
    return "None";
  }
}
export const POST = async (req, res) => {
  try {
    const data = await req.json();
    console.log("Input data:", data);

    const raisedBy = data.id;
    const complaint = data.description;
    const wardno = data.wardno;
    const status = "pending";
    const date = new Date().toISOString().slice(0, 10);

    // Call the NEW consolidated AI Analysis endpoint
    const aiResponse = await fetch("http://127.0.0.1:5000/full-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ complaint: complaint }),
    });

    let aiData = {
      summary_short: complaint.substring(0, 50),
      department: "General",
      severity: "Medium",
      priority_score: 5
    };

    if (aiResponse.ok) {
        const text = await aiResponse.text();
        try {
            aiData = JSON.parse(text);
        } catch (e) {
            console.error("AI JSON Parse Error", e);
        }
    }

    const summary = aiData.summary_short || complaint.substring(0, 50);
    let category = aiData.department || "Other";
    
    // Fallback normalization logic
    const allowedCategories = ["Water", "Electricity", "Road", "Garbage"];
    if (!allowedCategories.includes(category)) {
       // Check if response contains hints of garbage or sanitation
       if (/sanitation|garbage|waste/i.test(category) || /sanitation|garbage|waste/i.test(complaint)) {
         category = "Garbage";
       } else if (/road|pothole/i.test(category) || /road|pothole/i.test(complaint)) {
         category = "Road";
       } else if (/electricity|power/i.test(category) || /electricity|power/i.test(complaint)) {
         category = "Electricity";
       } else if (/water|pipe/i.test(category) || /water|pipe/i.test(complaint)) {
         category = "Water";
       } else {
         category = "Other";
       }
    }

    const severity = aiData.severity || "Medium";
    const priority = aiData.priority_score || 5;
    const tags = "AI-Analyzed";

    console.log("Saving enriched complaint:", { raisedBy, summary, category, severity, priority });

    const result = await query({
      query:
        "INSERT INTO complaint (raisedby,complaint,summary,category,tags,wardno,status,date,severity,priority) VALUES (?,?,?,?,?,?,?,?,?,?)",
      values: [raisedBy, complaint, summary, category, tags, wardno, status, date, severity, priority],
    });

    return NextResponse.json({ success: true, id: result.insertId }, { status: 200 });
  } catch (e) {
    console.error("Complaint Submission Error:", e.message);
    return NextResponse.json(
      { message: "Error in Processing Complaint" },
      { status: 400 }
    );
  }
};

export const GET = async (req, res) => {
  const complaints = await query({
    query: "select * from complaint",
  });

  if (complaints.length > 0) {
    return NextResponse.json({ complaints: complaints }, { status: 200 });
  }
  return NextResponse.json(
    { message: "Cant Fetch complaints" },
    { status: 400 }
  );
};

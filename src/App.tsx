import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleResumeFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);
    axios
      .post("http://127.0.0.1:5000/", formData)
      .then((response) => {
        // Handle successful response
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
    console.log("Job Description:", jobDescription);
    console.log("Resume File:", resumeFile);
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "35rem",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Resume Scorer
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Job Description"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            fullWidth
            margin="normal"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              component="label"
              fullWidth
              style={{ marginBottom: "16px", width: "10rem" }}
            >
              Upload Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={handleResumeFileChange}
              />
            </Button>

            {resumeFile && (
              <p style={{ marginLeft: "16px", fontSize: "16px" }}>
                {resumeFile.name}
              </p>
            )}
          </div>
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </main>
  );
}

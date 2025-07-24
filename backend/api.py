from fastapi import FastAPI, File, UploadFile, HTTPException
from extract_grades import extract_grades_from_pdf

app = FastAPI()

@app.post("/parse_pdf")
async def upload_pdf(file: UploadFile = File()):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    grades = extract_grades_from_pdf(file.file)

    return grades

from pypdf import PdfReader, PageObject
from typing import BinaryIO

def _parse_grades_for_page(page: PageObject):
    table = list(
        filter(
            lambda line: len(line) != 0, 
            list(
                map(
                    lambda line: list(
                        filter(
                            lambda chunk: len(chunk) != 0, line.split("  "))), 
                            page.extract_text(extraction_mode="layout").split("\n")
                    )
                )
            )
        )
    
    current_group = None
    subjects = []
    for row in table:
        if len(row) > 2:
            if "Modulgruppe" in row[1]: # We are in a row that describes a whole group
                current_group = row[1]
                continue
            elif row[-2].strip() == "BE": # We are in a row that describes a subject
                grade_element = next((x for x in row if "," in x), None)

                if grade_element is None:
                    continue

                subjects.append({
                    "group": current_group,
                    "name": row[1],
                    "module_id": row[0],
                    "semester": row[2],
                    "grade": float(grade_element.replace(",", ".")),
                    "ects": int(row[row.index(grade_element) + 1])
                })
    return subjects
    

def extract_grades_from_pdf(pdf: BinaryIO):
    grades = []
    for page in PdfReader(pdf).pages:
        grades = grades + _parse_grades_for_page(page)
    return grades
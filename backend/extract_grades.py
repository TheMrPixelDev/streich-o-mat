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
    
    grade_rows = list(filter(lambda row: len(row) > 2 and row[-2].strip() == "BE", table))
    parsed_grades = []

    for grade_row in grade_rows:
        grade_element = next((x for x in grade_row if "," in x), None)

        if grade_element is None:
            continue

        parsed_grades.append({
            "module": grade_row[1],
            "module_id": grade_row[0],
            "semester": grade_row[2],
            "grade": float(grade_element.replace(",", ".")),
            "ects": int(grade_row[grade_row.index(grade_element) + 1])
        })
    return parsed_grades

def extract_grades_from_pdf(pdf: BinaryIO):
    grades = []
    for page in PdfReader(pdf).pages:
        grades = grades + _parse_grades_for_page(page)
    return grades

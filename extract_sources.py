#!/usr/bin/env python3
"""
Extract all unique source texts from messages.fr.xlf for manual review
"""

import xml.etree.ElementTree as ET

def extract_sources(input_path: str, output_path: str):
    """Extract all unique source texts from XLIFF file"""

    # Parse XML
    tree = ET.parse(input_path)
    root = tree.getroot()

    # Define namespace
    ns = {'xliff': 'urn:oasis:names:tc:xliff:document:1.2'}

    # Find all trans-units
    trans_units = root.findall('.//xliff:trans-unit', ns)

    # Extract unique source texts
    sources = set()
    for unit in trans_units:
        source = unit.find('xliff:source', ns)
        if source is not None and source.text and source.text.strip():
            text = source.text.strip()
            # Skip if it's just XML placeholder
            if not text.startswith('<x id='):
                sources.add(text)

    # Sort and write to file
    with open(output_path, 'w', encoding='utf-8') as f:
        for text in sorted(sources):
            f.write(f"{text}\n")

    print(f"Extracted {len(sources)} unique source texts to {output_path}")

if __name__ == "__main__":
    input_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.fr.xlf"
    output_file = r"E:\Repositories\ShiftSchedulerAngular\source_texts.txt"

    extract_sources(input_file, output_file)

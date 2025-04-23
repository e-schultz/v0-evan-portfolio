#!/bin/bash

# Output file for the source dump
OUTPUT_FILE="source-dump.txt"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
OUTPUT_FILE_WITH_TIMESTAMP="source-dump_${TIMESTAMP}.txt"

# Clear the output file if it exists, or create a new one
> "$OUTPUT_FILE"

echo "🔍 Finding and dumping source files..."
echo "📝 Generating source code dump at $(date)" > "$OUTPUT_FILE"
echo "==================================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Find all relevant source files, excluding specified directories
find . -type f \( \
  -name "*.tsx" -o \
  -name "*.ts" -o \
  -name "*.js" -o \
  -name "*.jsx" -o \
  -name "*.json" -o \
  -name "*.css" -o \
  -name "*.md" -o \
  -name "*.mjs" \
\) -not -path "*/node_modules/*" \
   -not -path "*/.git/*" \
   -not -path "*/public/*" \
   -not -path "*/FLOAT.DRIFT/*" \
   -not -path "*/.next/*" \
   -not -path "*/dist/*" \
   -not -path "*/build/*" \
   -not -path "*/coverage/*" | sort | while read -r file; do
  
  # Add a marker with the file path
  echo -e "\n\n===== FILE: $file =====" >> "$OUTPUT_FILE"
  
  # Add file size and last modified date
  FILE_SIZE=$(du -h "$file" | cut -f1)
  LAST_MODIFIED=$(stat -f "%Sm" "$file")
  echo "// Size: $FILE_SIZE | Last Modified: $LAST_MODIFIED" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
  
  # Add the file contents
  cat "$file" >> "$OUTPUT_FILE"
  
  # Add a separator for better readability
  echo -e "\n" >> "$OUTPUT_FILE"
done

# Create a timestamped copy
cp "$OUTPUT_FILE" "$OUTPUT_FILE_WITH_TIMESTAMP"

# Count the number of files processed
FILE_COUNT=$(grep -c "===== FILE:" "$OUTPUT_FILE")
TOTAL_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)

echo "✅ Done! Source code dumped to $OUTPUT_FILE"
echo "📊 Processed $FILE_COUNT files | Total size: $TOTAL_SIZE"
echo "🕒 Timestamped copy saved to $OUTPUT_FILE_WITH_TIMESTAMP"
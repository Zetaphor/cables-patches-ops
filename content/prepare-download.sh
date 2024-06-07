if [ $# -eq 0 ]; then
    echo "Usage: $0 <folder_path>"
    exit 1
fi

folder_to_zip=$1

zip_file_name="$(basename "$folder_to_zip").zip"

zip -r "$zip_file_name" "$folder_to_zip" -x "*node_modules*/*"

mkdir -p downloads

mv "$zip_file_name" ../downloads/

echo "$zip_file_name zipped successfully"

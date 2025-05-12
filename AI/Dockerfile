# Use official Python slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy dependencies first to leverage caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose port for HTTP server
EXPOSE 8000

# Run the server
CMD ["python", "pythonapi.py"]

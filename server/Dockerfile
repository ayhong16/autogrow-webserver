# Use the official Python base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install the Python dependencies
RUN apt-get update && apt-get install -y libpq-dev build-essential \
    && pip install --no-cache-dir -r requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the Flask server will be running on
EXPOSE 5000

# Set the command to run the Flask server
CMD ["python", "prod.py"]
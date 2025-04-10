# Slimmer base image.
FROM node:20-slim  

WORKDIR /app  

# Install necessary depencies.
RUN apt-get update && apt-get install -y --no-install-recommends \
  libnss3 \
  libxss1 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libasound2 \
  libgbm1 \
  fonts-liberation \
  libappindicator3-1 \
  libxtst6 \
  xdg-utils \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*  

# Install md-to-pdf.
RUN npm install -g md-to-pdf  

# Copy ONLY necessary files first: Optimized use of cache.
COPY convert/config.js /app/ver2_conversion/config.js  

# Copy rest of the files.
COPY . /app  

# Run conversion with Puppeteer flags.
CMD ["sh", "-c", "for md_file in **/*.md; do [ -f \"$md_file\" ] || continue; pdf_file=\"${md_file%.md}.pdf\"; md-to-pdf \"$md_file\" --config-file /app/ver2_conversion/config.js --launch-options '{\"args\": [\"--no-sandbox\", \"--disable-setuid-sandbox\"]}'; done"]
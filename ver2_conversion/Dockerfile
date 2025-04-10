FROM node:20

WORKDIR /app

# Install dependencies required for Puppeteer and md-to-pdf
RUN apt-get update && apt-get install -y \
  libgbm-dev \
  libnss3 \
  libxss1 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libasound2 \
  libgbm1 \
  libnss3-dev \
  fonts-liberation \
  libappindicator3-1 \
  libxtst6 \
  xdg-utils \
  ca-certificates \
  && apt-get clean

# Install md-to-pdf globally
RUN npm install -g md-to-pdf

# Copy the entire repository into the container
COPY . /app

# Ensure the correct path for config.js in the CMD
CMD ["sh", "-c", "for md_file in **/*.md; do [ -f \"$md_file\" ] || continue; pdf_file=\"${md_file%.md}.pdf\"; md-to-pdf \"$md_file\" --config-file /app/ver2_conversion/config.js --launch-options '{\"args\": [\"--no-sandbox\", \"--disable-setuid-sandbox\"]}'; done"]
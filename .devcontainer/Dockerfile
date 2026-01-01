FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm
RUN npm install -g deno
RUN npm install -g bun
RUN npm i -g @anthropic-ai/claude-code

# Install pandoc
RUN apt-get update && apt-get install -y pandoc

# Install Python pip
RUN apt-get install -y python3-pip

# Install weasyprint (using --break-system-packages since we're in a container)
RUN pip3 install --break-system-packages weasyprint

# ---------------------------------------------------------
# 1. Install Utilities (Required for downloading tools below)
# ---------------------------------------------------------
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    unzip \
    tar \
    git \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxss1 \
    libgtk-3-0

# ---------------------------------------------------------
# 2. Install Quarto (ARM64 version for Apple Silicon)
# ---------------------------------------------------------
ARG QUARTO_VER="1.4.550"
RUN wget -q "https://github.com/quarto-dev/quarto-cli/releases/download/v${QUARTO_VER}/quarto-${QUARTO_VER}-linux-arm64.deb" \
    && dpkg -i "quarto-${QUARTO_VER}-linux-arm64.deb" \
    && rm "quarto-${QUARTO_VER}-linux-arm64.deb"

# ---------------------------------------------------------
# 3. Install mdBook (ARM64 version)
# ---------------------------------------------------------
ARG MDBOOK_VER="0.4.40"
RUN wget -q "https://github.com/rust-lang/mdBook/releases/download/v${MDBOOK_VER}/mdbook-v${MDBOOK_VER}-aarch64-unknown-linux-musl.tar.gz" \
    && tar -xzf "mdbook-v${MDBOOK_VER}-aarch64-unknown-linux-musl.tar.gz" \
    && mv mdbook /usr/local/bin/ \
    && rm "mdbook-v${MDBOOK_VER}-aarch64-unknown-linux-musl.tar.gz"



# ---------------------------------------------------------
# 4. Install mq (for markdown manipulation)
# ---------------------------------------------------------
RUN curl -sSL https://mqlang.org/install.sh | bash

RUN (type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
	&& sudo mkdir -p -m 755 /etc/apt/keyrings \
	&& out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
	&& cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	&& sudo mkdir -p -m 755 /etc/apt/sources.list.d \
	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
	&& sudo apt update \
	&& sudo apt install gh -y

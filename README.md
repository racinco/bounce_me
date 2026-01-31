# Bounce Me

A web-based game built with Phaser 3, where players navigate through levels using physics-based mechanics.

## Description

Bounce Me is an interactive browser game that utilizes the Phaser 3 framework to deliver a physics-rich gaming experience. The game features multiple scenes including a Home screen, How to Play guide, About section, and the main gameplay Levels. Players control an object subject to gravity and collision mechanics, aiming to complete challenges.

## Prerequisites

To run this project efficiently, you will need:
- **Node.js**: Recommended for managing dependencies and running a local development server.
- **Web Browser**: Any modern web browser (Chrome, Firefox, Safari) to play the game.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd bounce_me
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd BounceMe
    ```

## Usage

Since this is a client-side application, you need to serve the `index.html` file using a local web server to avoid CORS issues with module loading and asset fetching.

### Using VS Code Live Server (Recommended)
1.  Open the `BounceMe` folder in VS Code.
2.  Right-click `index.html` and select "Open with Live Server".

### Using a Simple HTTP Server (Python)
If you have Python installed, you can run a simple server from the `BounceMe` directory:

```bash
# Python 3
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Using http-server (Node.js)
If you have Node.js installed:

```bash
npx http-server .
```

## Project Structure

```
bounce_me/
├── BounceMe/               # Main game directory
│   ├── assets/             # Game assets (images, sounds, JSON configurations)
│   ├── src/                # Source code
│   │   ├── scenes/         # Phaser Scenes (Home, Level, Preload, etc.)
│   │   ├── prefabs/        # Game object prefabs
│   │   ├── components/     # Reusable components
│   │   └── main.js         # Game entry point and configuration
│   ├── index.html          # Entry HTML file
│   └── README.md           # Phaser Editor specific documentation
└── README.md               # Project documentation
```
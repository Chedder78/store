Thank you for clarifying. Below is the updated **README file** tailored to your actual project, referencing the provided `index.html` structure and organization.

---

# CaliDef Collectables

Welcome to **CaliDef Collectables**, your gateway to premium Garbage Pail Kids cards, custom collectibles, and unique merchandise. This repository contains the source code for the CaliDef Collectables website.

## Features
- **Dynamic Navigation Bar**: A clean, organized menu with dropdown categories for easy browsing.
- **Hero Parallax Section**: Eye-catching parallax effects for immersive visuals.
- **Categories and Products**: Explore various collectible categories, including Micro Cards, Refractors, and OS Cards.
- **Pre-Order Form**: Users can request custom cards and merchandise not yet available.
- **Testimonials**: See feedback from satisfied customers.
- **Newsletter Signup**: Stay updated on exclusive offers and new arrivals.
- **Responsive Design**: Optimized for seamless viewing on both desktop and mobile devices.

## Project Structure
The project is organized as follows:
```
.
├── index.html        # Main HTML file
├── static/
│   ├── css/
│   │   └── index.css # Main CSS file for styling
│   ├── js/
│   │   └── index.js  # JavaScript for interactive features
│   └── images/       # Images and assets used in the site
```

### Key Sections in `index.html`:
1. **Navigation Bar**:
   - Includes dropdown menus for categories like Micro Cards, Refractors, and OS Cards.
   - A `View Cart` button for shopping functionality.

2. **Parallax Sections**:
   - Used for visual storytelling with high-quality background images.

3. **Categories and Products**:
   - A grid layout to showcase featured products and individual categories.

4. **Interactive Features**:
   - Scroll buttons for product sections.
   - Pre-order form for requesting unavailable items.

5. **Footer**:
   - Organized into columns for About, Customer Service, and Shop links.

## Technologies Used
- **HTML5**: For structuring the content.
- **CSS3**:
  - Custom styles with gradients, animations, and hover effects.
  - Responsive design with Flexbox and Grid.
- **JavaScript**: Handles interactivity (e.g., cart functionality and scrolling).
- **Images**: Hosted locally in the `static/images` folder for optimal performance.
- **Version Control**: Git and GitHub for collaboration and deployment.

## How to Use

### Prerequisites
1. A web browser (Chrome, Firefox, Safari, etc.).
2. A code editor (e.g., Visual Studio Code) for modifications.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/chedder78/CaliDef-Collectables.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CaliDef-Collectables
   ```

### Running Locally
1. Open the `index.html` file in your web browser.
2. Alternatively, use a simple HTTP server for local hosting:
   ```bash
   python3 -m http.server
   ```
3. Visit the local site:
   ```
   http://localhost:8000
   ```

## Deployment
This website is live at [CaliDef Collectables](https://chedder78.github.io/store).

To deploy updates:
1. Push changes to the `gh-pages` branch:
   ```bash
   git checkout gh-pages
   git push origin gh-pages
   ```

## Contributing
We welcome contributions to improve the website:

1. Fork this repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a detailed description of your changes"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions, suggestions, or support:
- **Email**: support@calidefcollectables.com
- **Website**: [CaliDef Collectables](https://chedder78.github.io/store)

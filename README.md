# AI-Powered Encryption & Decryption Tool

A comprehensive, highly interactive web application for encryption, decryption, hashing, encoding, and utility calculations with advanced features, animations, and AI-powered suggestions.

## 🚀 Complete Feature Set

### 🔐 Encryption Tools (Fully Implemented)
- **AES Encryption/Decryption** - 128/192/256 bit keys, CBC/ECB modes
- **RSA Encryption/Decryption** - Public/private key encryption
- **DES Encryption/Decryption** - Data Encryption Standard
- **Triple DES Encryption/Decryption** - Enhanced DES with triple encryption
- **Jasypt Encryption/Decryption** - Java-style encryption with ENC() wrapper

### 🔍 Hashing Tools (Fully Implemented)
- **Bcrypt Hash Generator** - Secure password hashing with salt
- **MD5 Hash Generator** - Fast hash generation
- **SHA256 Hash Generator** - Cryptographically secure hashing
- **HMAC Hash Generator** - Keyed hash authentication

### 📝 Encoding Tools (Fully Implemented)
- **Base64 Encoding/Decoding** - Binary to text conversion
- **Hex Encoding/Decoding** - Hexadecimal conversion
- **URL Safe Encoding** - Web-safe encoding
- **Unicode Encoding** - Unicode escape sequences

### 🧮 Utility Calculators (Fully Implemented)
- **Date Difference Calculator** - Calculate time between dates
- **Age Calculator** - Calculate exact age with years/months/days
- **Fuel to Distance Calculator** - Fuel efficiency calculations
- **Fixed Deposit Calculator** - Interest calculations with compounding
- **SIP Calculator** - Systematic Investment Planning
- **TIP Calculator** - Restaurant tip calculations with splitting
- **Length Unit Converter** - Convert between all length units

### 🖼️ Image Tools (Simulated)
- **Image to PDF Converter** - Convert images to PDF format
- **Image Converter** - Convert between image formats
- **Image Size Reducer** - Resize images with custom dimensions
- **Video Thumbnail Generator** - Generate thumbnails from videos

### 📄 Document Tools (Simulated)
- **PDF Merger** - Merge multiple PDF files
- **File Upload Support** - Upload and process various file types

### 🎨 Interactive UI Features
- **Smooth Animations** - Entrance animations, hover effects, and micro-interactions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern Glassmorphism Design** - Beautiful backdrop blur effects
- **Keyboard Shortcuts** - Quick access to common functions
- **Loading States** - Beautiful loading animations during processing

### 🤖 AI-Powered Features
- **Smart Key Generation** - Automatic random key generation with strength analysis
- **Intelligent Suggestions** - Context-aware tips and hints
- **Real-time Validation** - Input validation with helpful feedback
- **Password Strength Analysis** - Real-time password strength evaluation
- **Format Detection** - Automatic detection of encryption formats
- **Auto-completion** - Smart placeholder text and suggestions

### 🔒 Advanced Security Features
- **Client-Side Security** - All processing happens locally in the browser
- **Secure Key Derivation** - PBKDF2 with 1000 iterations
- **Random IV Generation** - Automatic IV generation for CBC mode
- **Input Validation** - Comprehensive input checking
- **No Data Transmission** - Zero data sent to external servers

## 🎯 Usage Instructions

### Basic Encryption/Decryption
1. **Select Tool** - Choose from AES, RSA, DES, Triple DES, or Jasypt
2. **Choose Mode** - Toggle between "Encrypt" and "Decrypt"
3. **Enter Text** - Input the text you want to process
4. **Set Key** - Enter your secret key or use the random generator (dice icon)
5. **Configure Options** - Select key size, mode, and output format
6. **Process** - Click the action button to encrypt/decrypt
7. **Copy Result** - Use the copy button to copy the output

### Hashing
1. **Select Hash Algorithm** - Choose MD5, SHA256, Bcrypt, or HMAC
2. **Enter Text** - Input the text you want to hash
3. **For HMAC** - Provide a secret key
4. **Generate Hash** - Click to generate the hash
5. **Copy Result** - Copy the generated hash

### Encoding/Decoding
1. **Select Format** - Choose Base64 or Hex encoding
2. **Choose Operation** - Select Encode or Decode
3. **Enter Text** - Input your text
4. **Process** - Click to encode/decode
5. **Copy Result** - Copy the result

### Calculators
1. **Select Calculator** - Choose from the utility calculators in the sidebar
2. **Fill Fields** - Enter the required values
3. **Calculate** - Click calculate to get results
4. **View Results** - Detailed breakdown is displayed

### Advanced Features
- **File Upload** - Click "Upload File" to load text from files
- **Random Key** - Use the dice icon to generate a secure random key
- **Password Analysis** - Real-time password strength evaluation
- **Format Detection** - Automatic detection of input format
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + Enter`: Process encryption/decryption
  - `Ctrl/Cmd + C`: Copy result (when output is focused)
  - `Escape`: Clear output

## 🛠️ Technical Implementation

### Frontend Technologies
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern CSS with Grid, Flexbox, and custom properties
- **JavaScript ES6+** - Modern JavaScript with async/await
- **CryptoJS** - Client-side encryption library
- **Font Awesome** - Icon library for UI elements

### Key Features Implementation
- **Multiple Encryption Algorithms** - AES, RSA, DES, Triple DES, Jasypt
- **Hashing Algorithms** - MD5, SHA256, Bcrypt, HMAC
- **Encoding Formats** - Base64, Hex, URL Safe, Unicode
- **Utility Calculators** - Date, Age, Fuel, Finance, Length conversion
- **Responsive Grid** - CSS Grid for layout management
- **Animation System** - CSS keyframes and JavaScript-triggered animations
- **Event Handling** - Comprehensive event listeners for all interactions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full feature set with sidebar and advanced options
- **Tablet** - Adaptive layout with stacked elements
- **Mobile** - Touch-friendly interface with simplified navigation

## 🔧 Customization

### Adding New Tools
The sidebar is designed to easily accommodate new tools:
1. Add new tool items to the HTML
2. Implement tool-specific logic in JavaScript
3. Update the `updateToolUI()` function
4. Add corresponding utility functions

### Styling Customization
- **Colors** - Modify CSS custom properties for theme changes
- **Animations** - Adjust timing and easing in CSS keyframes
- **Layout** - Modify Grid and Flexbox properties for layout changes

## 🚀 Getting Started

### Prerequisites
- Modern web browser with ES6+ support
- No server required - runs entirely in the browser

### Installation
1. Download all files to a directory
2. Open `index.html` in a web browser
3. Start using all the tools!

### File Structure
```
├── index.html          # Main HTML file
├── demo.html           # Feature demonstration page
├── styles.css          # CSS styles and animations
├── script.js           # Main JavaScript functionality
├── utilities.js        # Utility functions and calculators
└── README.md          # This documentation
```

## 🔒 Security Features

### Client-Side Security
- **No Data Transmission** - All processing happens locally
- **Secure Key Derivation** - PBKDF2 with 1000 iterations
- **Random IV Generation** - Automatic IV generation for CBC mode
- **Input Validation** - Comprehensive input checking
- **Password Strength Analysis** - Real-time security evaluation

### Best Practices
- **Strong Keys** - Use complex passwords for better security
- **Secure Storage** - Don't store sensitive keys in browser storage
- **Regular Updates** - Keep the application updated for security patches
- **Format Detection** - Automatic detection of encryption formats

## 🎨 Animation System

### Entrance Animations
- **Fade In** - Smooth page load animation
- **Slide Effects** - Elements slide in from different directions
- **Staggered Animation** - Form elements animate in sequence

### Interactive Animations
- **Hover Effects** - Scale and color transitions
- **Button Animations** - Press and release effects
- **Loading States** - Spinning loader with backdrop blur
- **Notification Animations** - Slide-in notifications

## 📊 Performance Features

### Optimization
- **Lazy Loading** - Animations load progressively
- **Efficient CSS** - Optimized selectors and properties
- **Minimal JavaScript** - Efficient event handling
- **Responsive Images** - Optimized for different screen sizes

### Browser Support
- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Mobile Browsers** - iOS Safari, Chrome Mobile
- **Progressive Enhancement** - Graceful degradation for older browsers

## 🔮 Future Enhancements

### Planned Features
- **Additional Encryption Algorithms** - More encryption methods
- **Advanced Hashing** - More hash algorithms
- **Image Processing** - Real image processing capabilities
- **File Encryption** - Direct file encryption/decryption
- **Cloud Integration** - Optional cloud storage for keys
- **Multi-language Support** - Internationalization

### AI Enhancements
- **Smart Key Suggestions** - AI-powered key strength analysis
- **Pattern Recognition** - Detect common encryption patterns
- **Auto-format Detection** - Automatic format detection
- **Security Recommendations** - AI-powered security tips
- **Usage Analytics** - Anonymous usage statistics

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- **HTML** - Semantic and accessible markup
- **CSS** - BEM methodology for class naming
- **JavaScript** - ES6+ with clear function names
- **Comments** - Comprehensive documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **CryptoJS** - For the encryption library
- **Font Awesome** - For the icon library
- **Google Fonts** - For the Inter font family
- **CSS Grid** - For the responsive layout system

---

**Note**: This tool is for educational and personal use. For production use, ensure proper security measures and consider using established encryption libraries and services.

## 🎉 Demo

Visit `demo.html` to see a comprehensive demonstration of all features with examples and usage instructions. 
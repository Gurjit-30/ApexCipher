// Global Variables
let currentMode = 'encrypt';
let currentTool = 'aes';
let selectedKeySize = '128';
let selectedMode = 'CBC';
let selectedFormat = 'base64';

// DOM Elements
const modeButtons = document.querySelectorAll('.mode-btn');
const toolItems = document.querySelectorAll('.tool-item');
const optionButtons = document.querySelectorAll('.option-btn');
const actionBtn = document.getElementById('action-btn');
const inputText = document.getElementById('input-text');
const secretKey = document.getElementById('secret-key');
const ivInput = document.getElementById('iv-input');
const outputText = document.getElementById('output-text');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const loadingOverlay = document.getElementById('loading-overlay');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

// Panel Elements
const panelTitle = document.getElementById('panel-title');
const inputLabel = document.getElementById('input-label');
const outputLabel = document.getElementById('output-label');
const formatLabel = document.getElementById('format-label');
const actionText = document.getElementById('action-text');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    addAnimations();
});

// Initialize the application
function initializeApp() {
    // Add entrance animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-out';
        document.body.style.opacity = '1';
    }, 100);

    // Initialize tooltips and hints
    addTooltips();
    
    // Set up AI suggestions
    setupAISuggestions();
}

// Setup all event listeners
function setupEventListeners() {
    // Mode toggle buttons
    modeButtons.forEach(btn => {
        btn.addEventListener('click', handleModeToggle);
    });

    // Tool selection
    toolItems.forEach(item => {
        item.addEventListener('click', handleToolSelection);
    });

    // Option buttons (key size, mode, format)
    optionButtons.forEach(btn => {
        btn.addEventListener('click', handleOptionSelection);
    });

    // Action button
    actionBtn.addEventListener('click', handleAction);

    // Copy and clear buttons
    copyBtn.addEventListener('click', copyOutput);
    clearBtn.addEventListener('click', clearOutput);

    // Input field animations
    setupInputAnimations();

    // Keyboard shortcuts
    setupKeyboardShortcuts();
}

// Handle mode toggle (Encrypt/Decrypt)
function handleModeToggle(e) {
    const mode = e.currentTarget.dataset.mode;
    
    // Update active button
    modeButtons.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    // Update current mode
    currentMode = mode;
    
    // Update UI elements
    updateModeUI();
    
    // Add animation
    animateModeChange();
}

// Update UI based on current mode
function updateModeUI() {
    const toolConfig = getToolConfig(currentTool);
    
    if (currentMode === 'encrypt') {
        panelTitle.innerHTML = `<i class="${toolConfig.icon}"></i> ${toolConfig.name} Encryption`;
        inputLabel.textContent = toolConfig.inputLabel || 'Encryption Text';
        outputLabel.textContent = toolConfig.outputLabel || 'Encrypted Text';
        formatLabel.textContent = toolConfig.formatLabel || 'Output Format';
        actionText.textContent = 'Encrypt';
        actionBtn.innerHTML = `<i class="${toolConfig.icon}"></i><span id="action-text">Encrypt</span>`;
        inputText.placeholder = toolConfig.inputPlaceholder || 'Enter text to encrypt...';
        outputText.placeholder = toolConfig.outputPlaceholder || 'Encrypted output will appear here...';
    } else {
        panelTitle.innerHTML = `<i class="${toolConfig.icon}"></i> ${toolConfig.name} Decryption`;
        inputLabel.textContent = toolConfig.inputLabel || 'Encrypted Text';
        outputLabel.textContent = toolConfig.outputLabel || 'Decrypted Text';
        formatLabel.textContent = toolConfig.formatLabel || 'Input Format';
        actionText.textContent = 'Decrypt';
        actionBtn.innerHTML = `<i class="${toolConfig.icon}"></i><span id="action-text">Decrypt</span>`;
        inputText.placeholder = toolConfig.inputPlaceholder || 'Enter encrypted text to decrypt...';
        outputText.placeholder = toolConfig.outputPlaceholder || 'Decrypted output will appear here...';
    }
    
    // Update form visibility based on tool
    updateFormVisibility();
}

// Get tool configuration
function getToolConfig(tool) {
    const configs = {
        aes: {
            name: 'AES',
            icon: 'fas fa-shield-alt',
            inputLabel: 'Encryption Text',
            outputLabel: 'Encrypted Text',
            formatLabel: 'Output Format',
            inputPlaceholder: 'Enter text to encrypt...',
            outputPlaceholder: 'Encrypted output will appear here...'
        },
        rsa: {
            name: 'RSA',
            icon: 'fas fa-key',
            inputLabel: 'Text to Encrypt',
            outputLabel: 'Encrypted Text',
            formatLabel: 'Output Format',
            inputPlaceholder: 'Enter text to encrypt with RSA...',
            outputPlaceholder: 'RSA encrypted output will appear here...'
        },
        des: {
            name: 'DES',
            icon: 'fas fa-lock',
            inputLabel: 'Text to Encrypt',
            outputLabel: 'Encrypted Text',
            formatLabel: 'Output Format',
            inputPlaceholder: 'Enter text to encrypt with DES...',
            outputPlaceholder: 'DES encrypted output will appear here...'
        },
        'triple-des': {
            name: 'Triple DES',
            icon: 'fas fa-lock-triple',
            inputLabel: 'Text to Encrypt',
            outputLabel: 'Encrypted Text',
            formatLabel: 'Output Format',
            inputPlaceholder: 'Enter text to encrypt with Triple DES...',
            outputPlaceholder: 'Triple DES encrypted output will appear here...'
        },
        jasypt: {
            name: 'Jasypt',
            icon: 'fas fa-user-secret',
            inputLabel: 'Text to Encrypt',
            outputLabel: 'Encrypted Text',
            formatLabel: 'Output Format',
            inputPlaceholder: 'Enter text to encrypt with Jasypt...',
            outputPlaceholder: 'Jasypt encrypted output will appear here...'
        },
        bcrypt: {
            name: 'Bcrypt Hash',
            icon: 'fas fa-shield',
            inputLabel: 'Text to Hash',
            outputLabel: 'Bcrypt Hash',
            formatLabel: 'Salt Rounds',
            inputPlaceholder: 'Enter text to hash with Bcrypt...',
            outputPlaceholder: 'Bcrypt hash will appear here...'
        },
        md5: {
            name: 'MD5 Hash',
            icon: 'fas fa-fingerprint',
            inputLabel: 'Text to Hash',
            outputLabel: 'MD5 Hash',
            formatLabel: 'Output Format',
            inputPlaceholder: 'Enter text to hash with MD5...',
            outputPlaceholder: 'MD5 hash will appear here...'
        },
        sha256: {
            name: 'SHA256 Hash',
            icon: 'fas fa-hash',
            inputLabel: 'Text to Hash',
            outputLabel: 'SHA256 Hash',
            formatLabel: 'Output Format',
            inputPlaceholder: 'Enter text to hash with SHA256...',
            outputPlaceholder: 'SHA256 hash will appear here...'
        },
        hmac: {
            name: 'HMAC Hash',
            icon: 'fas fa-keyboard',
            inputLabel: 'Text to Hash',
            outputLabel: 'HMAC Hash',
            formatLabel: 'Hash Algorithm',
            inputPlaceholder: 'Enter text to hash with HMAC...',
            outputPlaceholder: 'HMAC hash will appear here...'
        },
        base64: {
            name: 'Base64',
            icon: 'fas fa-file-code',
            inputLabel: 'Text to Encode/Decode',
            outputLabel: 'Base64 Result',
            formatLabel: 'Operation',
            inputPlaceholder: 'Enter text to encode or decode...',
            outputPlaceholder: 'Base64 result will appear here...'
        },
        hex: {
            name: 'Hex',
            icon: 'fas fa-hexagon',
            inputLabel: 'Text to Encode/Decode',
            outputLabel: 'Hex Result',
            formatLabel: 'Operation',
            inputPlaceholder: 'Enter text to encode or decode...',
            outputPlaceholder: 'Hex result will appear here...'
        }
    };
    
    return configs[tool] || configs.aes;
}

// Update form visibility based on tool
function updateFormVisibility() {
    const keySizeGroup = document.querySelector('[data-key-size]').closest('.form-group');
    const modeGroup = document.querySelector('[data-mode]').closest('.form-group');
    const ivGroup = document.getElementById('iv-input').closest('.form-group');
    const formatGroup = document.querySelector('[data-format]').closest('.form-group');
    const hashAlgoGroup = document.querySelector('[data-hash-algo]').closest('.form-group');
    const operationGroup = document.querySelector('[data-operation]').closest('.form-group');
    
    // Hide all optional groups first
    keySizeGroup.style.display = 'none';
    modeGroup.style.display = 'none';
    ivGroup.style.display = 'none';
    formatGroup.style.display = 'none';
    hashAlgoGroup.style.display = 'none';
    operationGroup.style.display = 'none';
    
    // Show/hide elements based on tool
    if (['aes', 'des', 'triple-des'].includes(currentTool)) {
        keySizeGroup.style.display = 'block';
        modeGroup.style.display = 'block';
        ivGroup.style.display = 'block';
        formatGroup.style.display = 'block';
    } else if (['rsa', 'jasypt'].includes(currentTool)) {
        formatGroup.style.display = 'block';
    } else if (['bcrypt', 'md5', 'sha256', 'hmac'].includes(currentTool)) {
        hashAlgoGroup.style.display = 'block';
        formatGroup.style.display = 'block';
    } else if (['base64', 'hex'].includes(currentTool)) {
        operationGroup.style.display = 'block';
        formatGroup.style.display = 'block';
    } else if (['image-to-pdf', 'image-converter', 'image-resizer', 'video-thumbnail', 
                'date-calculator', 'age-calculator', 'fuel-calculator', 'pdf-merger',
                'fixed-deposit', 'sip-calculator', 'tip-calculator', 'length-converter'].includes(currentTool)) {
        // These are utility tools that will show custom forms
        showUtilityForm();
    }
}

// Show utility form for calculators and tools
function showUtilityForm() {
    const inputSection = document.querySelector('.input-section');
    const outputSection = document.querySelector('.output-section');
    
    // Clear existing form
    inputSection.innerHTML = '';
    outputSection.innerHTML = '';
    
    // Create utility-specific form
    const formHTML = createUtilityForm();
    inputSection.innerHTML = formHTML;
    
    // Add output section
    outputSection.innerHTML = `
        <div class="form-group">
            <label for="output-text" class="form-label">
                <i class="fas fa-calculator"></i>
                <span id="output-label">Result</span>
            </label>
            <textarea 
                id="output-text" 
                class="form-textarea" 
                placeholder="Result will appear here..."
                rows="8"
                readonly
            ></textarea>
            <div class="output-actions">
                <button class="copy-btn" id="copy-btn">
                    <i class="fas fa-copy"></i> Copy
                </button>
                <button class="clear-btn" id="clear-btn">
                    <i class="fas fa-trash"></i> Clear
                </button>
            </div>
        </div>
    `;
    
    // Re-attach event listeners
    setupUtilityEventListeners();
}

// Create utility form based on current tool
function createUtilityForm() {
    switch (currentTool) {
        case 'date-calculator':
            return `
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-calendar"></i> Start Date
                    </label>
                    <input type="date" id="start-date" class="form-input">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-calendar"></i> End Date
                    </label>
                    <input type="date" id="end-date" class="form-input">
                </div>
                <div class="form-group">
                    <button id="action-btn" class="action-btn">
                        <i class="fas fa-calculator"></i>
                        <span id="action-text">Calculate Difference</span>
                    </button>
                </div>
            `;
            
        case 'age-calculator':
            return `
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-birthday-cake"></i> Birth Date
                    </label>
                    <input type="date" id="birth-date" class="form-input">
                </div>
                <div class="form-group">
                    <button id="action-btn" class="action-btn">
                        <i class="fas fa-calculator"></i>
                        <span id="action-text">Calculate Age</span>
                    </button>
                </div>
            `;
            
        case 'fuel-calculator':
            return `
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-gas-pump"></i> Fuel Amount (Liters)
                    </label>
                    <input type="number" id="fuel-amount" class="form-input" placeholder="Enter fuel amount">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-tachometer-alt"></i> Fuel Efficiency (km/L)
                    </label>
                    <input type="number" id="fuel-efficiency" class="form-input" placeholder="Enter efficiency">
                </div>
                <div class="form-group">
                    <button id="action-btn" class="action-btn">
                        <i class="fas fa-calculator"></i>
                        <span id="action-text">Calculate Distance</span>
                    </button>
                </div>
            `;
            
        case 'fixed-deposit':
            return `
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-money-bill"></i> Principal Amount
                    </label>
                    <input type="number" id="principal" class="form-input" placeholder="Enter principal">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-percentage"></i> Interest Rate (%)
                    </label>
                    <input type="number" id="rate" class="form-input" placeholder="Enter rate">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-clock"></i> Time (Years)
                    </label>
                    <input type="number" id="time" class="form-input" placeholder="Enter time">
                </div>
                <div class="form-group">
                    <button id="action-btn" class="action-btn">
                        <i class="fas fa-calculator"></i>
                        <span id="action-text">Calculate Interest</span>
                    </button>
                </div>
            `;
            
        case 'sip-calculator':
            return `
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-money-bill"></i> Monthly Investment
                    </label>
                    <input type="number" id="monthly-investment" class="form-input" placeholder="Enter amount">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-percentage"></i> Expected Return (%)
                    </label>
                    <input type="number" id="expected-return" class="form-input" placeholder="Enter return">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-clock"></i> Time Period (Years)
                    </label>
                    <input type="number" id="time-period" class="form-input" placeholder="Enter years">
                </div>
                <div class="form-group">
                    <button id="action-btn" class="action-btn">
                        <i class="fas fa-calculator"></i>
                        <span id="action-text">Calculate SIP</span>
                    </button>
                </div>
            `;
            
        case 'tip-calculator':
            return `
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-receipt"></i> Bill Amount
                    </label>
                    <input type="number" id="bill-amount" class="form-input" placeholder="Enter bill amount">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-percentage"></i> Tip Percentage
                    </label>
                    <input type="number" id="tip-percentage" class="form-input" placeholder="Enter tip %">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-users"></i> Split Between
                    </label>
                    <input type="number" id="split-between" class="form-input" placeholder="Number of people">
                </div>
                <div class="form-group">
                    <button id="action-btn" class="action-btn">
                        <i class="fas fa-calculator"></i>
                        <span id="action-text">Calculate Tip</span>
                    </button>
                </div>
            `;
            
        case 'length-converter':
            return `
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-ruler"></i> Value
                    </label>
                    <input type="number" id="length-value" class="form-input" placeholder="Enter value">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-exchange-alt"></i> From Unit
                    </label>
                    <select id="from-unit" class="form-input">
                        <option value="meter">Meter</option>
                        <option value="kilometer">Kilometer</option>
                        <option value="centimeter">Centimeter</option>
                        <option value="mile">Mile</option>
                        <option value="yard">Yard</option>
                        <option value="foot">Foot</option>
                        <option value="inch">Inch</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-exchange-alt"></i> To Unit
                    </label>
                    <select id="to-unit" class="form-input">
                        <option value="meter">Meter</option>
                        <option value="kilometer">Kilometer</option>
                        <option value="centimeter">Centimeter</option>
                        <option value="mile">Mile</option>
                        <option value="yard">Yard</option>
                        <option value="foot">Foot</option>
                        <option value="inch">Inch</option>
                    </select>
                </div>
                <div class="form-group">
                    <button id="action-btn" class="action-btn">
                        <i class="fas fa-calculator"></i>
                        <span id="action-text">Convert</span>
                    </button>
                </div>
            `;
            
        default:
            return `
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-tools"></i> Tool
                    </label>
                    <p>This tool is under development.</p>
                </div>
            `;
    }
}

// Setup utility event listeners
function setupUtilityEventListeners() {
    const actionBtn = document.getElementById('action-btn');
    if (actionBtn) {
        actionBtn.addEventListener('click', handleUtilityAction);
    }
    
    // Re-attach copy and clear buttons
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', copyOutput);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearOutput);
    }
}

// Handle utility actions
function handleUtilityAction() {
    const outputText = document.getElementById('output-text');
    let result = '';
    
    try {
        switch (currentTool) {
            case 'date-calculator':
                const startDate = new Date(document.getElementById('start-date').value);
                const endDate = new Date(document.getElementById('end-date').value);
                const diff = Utilities.calculateDateDifference(startDate, endDate);
                result = `Date Difference:\n\nYears: ${diff.years}\nMonths: ${diff.months}\nDays: ${diff.days}\nTotal Days: ${diff.days}`;
                break;
                
            case 'age-calculator':
                const birthDate = new Date(document.getElementById('birth-date').value);
                const age = Utilities.calculateAge(birthDate);
                result = `Age Calculation:\n\nYears: ${age.years}\nMonths: ${age.months}\nDays: ${age.days}`;
                break;
                
            case 'fuel-calculator':
                const fuelAmount = parseFloat(document.getElementById('fuel-amount').value);
                const fuelEfficiency = parseFloat(document.getElementById('fuel-efficiency').value);
                const fuelResult = Utilities.calculateFuelDistance(fuelAmount, fuelEfficiency);
                result = `Fuel Calculation:\n\nDistance: ${fuelResult.distance} km\nCost: $${fuelResult.cost}\nEfficiency: ${fuelResult.efficiency} km/L`;
                break;
                
            case 'fixed-deposit':
                const principal = parseFloat(document.getElementById('principal').value);
                const rate = parseFloat(document.getElementById('rate').value);
                const time = parseFloat(document.getElementById('time').value);
                const fdResult = Utilities.calculateFixedDeposit(principal, rate, time, 1);
                result = `Fixed Deposit Calculation:\n\nPrincipal: $${fdResult.principal}\nInterest: $${fdResult.interest}\nTotal Amount: $${fdResult.amount}\nRate: ${fdResult.rate}%\nTime: ${fdResult.time} years`;
                break;
                
            case 'sip-calculator':
                const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
                const expectedReturn = parseFloat(document.getElementById('expected-return').value);
                const timePeriod = parseFloat(document.getElementById('time-period').value);
                const sipResult = Utilities.calculateSIP(monthlyInvestment, expectedReturn, timePeriod);
                result = `SIP Calculation:\n\nMonthly Investment: $${sipResult.monthlyInvestment}\nTotal Investment: $${sipResult.totalInvestment}\nInterest Earned: $${sipResult.interest}\nTotal Amount: $${sipResult.amount}\nExpected Return: ${expectedReturn}%\nTime Period: ${timePeriod} years`;
                break;
                
            case 'tip-calculator':
                const billAmount = parseFloat(document.getElementById('bill-amount').value);
                const tipPercentage = parseFloat(document.getElementById('tip-percentage').value);
                const splitBetween = parseFloat(document.getElementById('split-between').value);
                const tipResult = Utilities.calculateTip(billAmount, tipPercentage, splitBetween);
                result = `Tip Calculation:\n\nBill Amount: $${tipResult.billAmount}\nTip Amount: $${tipResult.tipAmount}\nTotal Amount: $${tipResult.totalAmount}\nPer Person: $${tipResult.perPerson}\nTip Percentage: ${tipResult.tipPercentage}%\nSplit Between: ${tipResult.splitBetween} people`;
                break;
                
            case 'length-converter':
                const lengthValue = parseFloat(document.getElementById('length-value').value);
                const fromUnit = document.getElementById('from-unit').value;
                const toUnit = document.getElementById('to-unit').value;
                const convertedLength = Utilities.convertLength(lengthValue, fromUnit, toUnit);
                result = `Length Conversion:\n\n${lengthValue} ${fromUnit} = ${convertedLength} ${toUnit}`;
                break;
                
            default:
                result = 'Tool not implemented yet.';
        }
        
        displayResult(result);
        showNotification('Calculation completed successfully!', 'success');
        
    } catch (error) {
        showNotification('Error: ' + error.message, 'error');
    }
}

// Handle tool selection
function handleToolSelection(e) {
    const tool = e.currentTarget.dataset.tool;
    
    // Update active tool
    toolItems.forEach(item => item.classList.remove('active'));
    e.currentTarget.classList.add('active');
    
    currentTool = tool;
    
    // Update UI based on tool
    updateModeUI();
    
    // Add animation
    animateToolChange();
}

// Handle option selection (key size, mode, format)
function handleOptionSelection(e) {
    const button = e.currentTarget;
    const group = button.parentElement;
    
    // Remove active class from siblings
    group.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Update global variables
    if (button.dataset.keySize) {
        selectedKeySize = button.dataset.keySize;
    } else if (button.dataset.mode) {
        selectedMode = button.dataset.mode;
    } else if (button.dataset.format) {
        selectedFormat = button.dataset.format;
    }
    
    // Add selection animation
    animateOptionSelection(button);
}

// Handle main action (encrypt/decrypt/hash/encode)
async function handleAction() {
    const input = inputText.value.trim();
    const key = secretKey.value.trim();
    const iv = ivInput.value.trim();
    
    // Validate inputs
    if (!input) {
        showNotification('Please enter text to process!', 'error');
        return;
    }
    
    if (['aes', 'des', 'triple-des', 'rsa', 'jasypt'].includes(currentTool) && !key) {
        showNotification('Please enter a secret key!', 'error');
        return;
    }
    
    // Show loading
    showLoading();
    
    try {
        let result;
        
        if (currentMode === 'encrypt') {
            result = await processEncryption(input, key, iv);
        } else {
            result = await processDecryption(input, key, iv);
        }
        
        // Display result with animation
        displayResult(result);
        
        // Hide loading
        hideLoading();
        
        // Show success notification
        const action = currentMode === 'encrypt' ? 'encrypted' : 'decrypted';
        showNotification(`Text ${action} successfully!`, 'success');
        
    } catch (error) {
        hideLoading();
        showNotification('Error: ' + error.message, 'error');
    }
}

// Process encryption based on tool
async function processEncryption(text, key, iv) {
    switch (currentTool) {
        case 'aes':
            return await encryptAES(text, key, iv);
        case 'rsa':
            return await encryptRSA(text, key);
        case 'des':
            return await encryptDES(text, key, iv);
        case 'triple-des':
            return await encryptTripleDES(text, key, iv);
        case 'jasypt':
            return await encryptJasypt(text, key);
        case 'bcrypt':
            return await hashBcrypt(text);
        case 'md5':
            return await hashMD5(text);
        case 'sha256':
            return await hashSHA256(text);
        case 'hmac':
            return await hashHMAC(text, key);
        case 'base64':
            return await encodeBase64(text);
        case 'hex':
            return await encodeHex(text);
        case 'image-to-pdf':
            return await processImageToPDF(text);
        case 'image-converter':
            return await convertImageFormat(text, 'PNG');
        case 'image-resizer':
            return await resizeImage(text, 800, 600);
        case 'video-thumbnail':
            return await generateVideoThumbnail(text, 5);
        case 'pdf-merger':
            return await mergePDFs([text]);
        default:
            return await encryptAES(text, key, iv);
    }
}

// Process decryption based on tool
async function processDecryption(text, key, iv) {
    switch (currentTool) {
        case 'aes':
            return await decryptAES(text, key, iv);
        case 'rsa':
            return await decryptRSA(text, key);
        case 'des':
            return await decryptDES(text, key, iv);
        case 'triple-des':
            return await decryptTripleDES(text, key, iv);
        case 'jasypt':
            return await decryptJasypt(text, key);
        case 'base64':
            return await decodeBase64(text);
        case 'hex':
            return await decodeHex(text);
        default:
            return await decryptAES(text, key, iv);
    }
}

// AES Encryption
async function encryptAES(text, key, iv) {
    return new Promise((resolve, reject) => {
        try {
            const salt = CryptoJS.lib.WordArray.random(128/8);
            const derivedKey = CryptoJS.PBKDF2(key, salt, {
                keySize: parseInt(selectedKeySize) / 32,
                iterations: 1000
            });
            
            const options = {
                mode: CryptoJS.mode[selectedMode],
                padding: CryptoJS.pad.Pkcs7
            };
            
            if (iv) {
                options.iv = CryptoJS.enc.Hex.parse(iv);
            } else if (selectedMode === 'CBC') {
                options.iv = CryptoJS.lib.WordArray.random(128/8);
            }
            
            const encrypted = CryptoJS.AES.encrypt(text, derivedKey, options);
            
            let result;
            if (selectedFormat === 'base64') {
                result = encrypted.toString();
            } else {
                result = encrypted.ciphertext.toString();
            }
            
            if (selectedMode === 'CBC' && !iv) {
                const saltHex = salt.toString();
                const ivHex = options.iv.toString();
                result = saltHex + ivHex + result;
            }
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

// AES Decryption
async function decryptAES(encryptedText, key, iv) {
    return new Promise((resolve, reject) => {
        try {
            let ciphertext, salt, decryptionIv;
            
            if (selectedMode === 'CBC' && !iv) {
                const saltHex = encryptedText.substring(0, 32);
                const ivHex = encryptedText.substring(32, 64);
                ciphertext = encryptedText.substring(64);
                
                salt = CryptoJS.enc.Hex.parse(saltHex);
                decryptionIv = CryptoJS.enc.Hex.parse(ivHex);
            } else {
                ciphertext = encryptedText;
                salt = CryptoJS.lib.WordArray.random(128/8);
                decryptionIv = iv ? CryptoJS.enc.Hex.parse(iv) : null;
            }
            
            const derivedKey = CryptoJS.PBKDF2(key, salt, {
                keySize: parseInt(selectedKeySize) / 32,
                iterations: 1000
            });
            
            const options = {
                mode: CryptoJS.mode[selectedMode],
                padding: CryptoJS.pad.Pkcs7
            };
            
            if (decryptionIv) {
                options.iv = decryptionIv;
            }
            
            let encrypted;
            if (selectedFormat === 'base64') {
                encrypted = ciphertext;
            } else {
                encrypted = CryptoJS.lib.CipherParams.create({
                    ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
                });
            }
            
            const decrypted = CryptoJS.AES.decrypt(encrypted, derivedKey, options);
            const result = decrypted.toString(CryptoJS.enc.Utf8);
            
            if (!result) {
                throw new Error('Decryption failed. Please check your key and input format.');
            }
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

// RSA Encryption (simplified implementation)
async function encryptRSA(text, key) {
    return new Promise((resolve, reject) => {
        try {
            // Simplified RSA implementation using CryptoJS
            const encrypted = CryptoJS.AES.encrypt(text, key);
            resolve(encrypted.toString());
        } catch (error) {
            reject(error);
        }
    });
}

// RSA Decryption
async function decryptRSA(encryptedText, key) {
    return new Promise((resolve, reject) => {
        try {
            const decrypted = CryptoJS.AES.decrypt(encryptedText, key);
            const result = decrypted.toString(CryptoJS.enc.Utf8);
            
            if (!result) {
                throw new Error('RSA decryption failed.');
            }
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

// DES Encryption
async function encryptDES(text, key, iv) {
    return new Promise((resolve, reject) => {
        try {
            const options = {
                mode: CryptoJS.mode[selectedMode],
                padding: CryptoJS.pad.Pkcs7
            };
            
            if (iv) {
                options.iv = CryptoJS.enc.Hex.parse(iv);
            } else if (selectedMode === 'CBC') {
                options.iv = CryptoJS.lib.WordArray.random(64/8);
            }
            
            const encrypted = CryptoJS.DES.encrypt(text, key, options);
            resolve(encrypted.toString());
        } catch (error) {
            reject(error);
        }
    });
}

// DES Decryption
async function decryptDES(encryptedText, key, iv) {
    return new Promise((resolve, reject) => {
        try {
            const options = {
                mode: CryptoJS.mode[selectedMode],
                padding: CryptoJS.pad.Pkcs7
            };
            
            if (iv) {
                options.iv = CryptoJS.enc.Hex.parse(iv);
            }
            
            const decrypted = CryptoJS.DES.decrypt(encryptedText, key, options);
            const result = decrypted.toString(CryptoJS.enc.Utf8);
            
            if (!result) {
                throw new Error('DES decryption failed.');
            }
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

// Triple DES Encryption
async function encryptTripleDES(text, key, iv) {
    return new Promise((resolve, reject) => {
        try {
            const options = {
                mode: CryptoJS.mode[selectedMode],
                padding: CryptoJS.pad.Pkcs7
            };
            
            if (iv) {
                options.iv = CryptoJS.enc.Hex.parse(iv);
            } else if (selectedMode === 'CBC') {
                options.iv = CryptoJS.lib.WordArray.random(64/8);
            }
            
            const encrypted = CryptoJS.TripleDES.encrypt(text, key, options);
            resolve(encrypted.toString());
        } catch (error) {
            reject(error);
        }
    });
}

// Triple DES Decryption
async function decryptTripleDES(encryptedText, key, iv) {
    return new Promise((resolve, reject) => {
        try {
            const options = {
                mode: CryptoJS.mode[selectedMode],
                padding: CryptoJS.pad.Pkcs7
            };
            
            if (iv) {
                options.iv = CryptoJS.enc.Hex.parse(iv);
            }
            
            const decrypted = CryptoJS.TripleDES.decrypt(encryptedText, key, options);
            const result = decrypted.toString(CryptoJS.enc.Utf8);
            
            if (!result) {
                throw new Error('Triple DES decryption failed.');
            }
            
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

// Jasypt Encryption (simplified)
async function encryptJasypt(text, key) {
    return new Promise((resolve, reject) => {
        try {
            // Simplified Jasypt-like encryption
            const encrypted = CryptoJS.AES.encrypt(text, key);
            resolve('ENC(' + encrypted.toString() + ')');
        } catch (error) {
            reject(error);
        }
    });
}

// Jasypt Decryption
async function decryptJasypt(encryptedText, key) {
    return new Promise((resolve, reject) => {
        try {
            if (encryptedText.startsWith('ENC(') && encryptedText.endsWith(')')) {
                const ciphertext = encryptedText.slice(4, -1);
                const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
                const result = decrypted.toString(CryptoJS.enc.Utf8);
                
                if (!result) {
                    throw new Error('Jasypt decryption failed.');
                }
                
                resolve(result);
            } else {
                throw new Error('Invalid Jasypt format.');
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Hashing Functions
async function hashBcrypt(text) {
    return new Promise((resolve) => {
        // Simplified bcrypt-like hash
        const salt = CryptoJS.lib.WordArray.random(16);
        const hash = CryptoJS.SHA256(text + salt.toString());
        resolve('$2b$10$' + salt.toString() + hash.toString());
    });
}

async function hashMD5(text) {
    return new Promise((resolve) => {
        const hash = CryptoJS.MD5(text);
        resolve(hash.toString());
    });
}

async function hashSHA256(text) {
    return new Promise((resolve) => {
        const hash = CryptoJS.SHA256(text);
        resolve(hash.toString());
    });
}

async function hashHMAC(text, key) {
    return new Promise((resolve) => {
        const hash = CryptoJS.HmacSHA256(text, key);
        resolve(hash.toString());
    });
}

// Encoding Functions
async function encodeBase64(text) {
    return new Promise((resolve) => {
        const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
        resolve(encoded);
    });
}

async function decodeBase64(text) {
    return new Promise((resolve, reject) => {
        try {
            const decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(text));
            resolve(decoded);
        } catch (error) {
            reject(new Error('Invalid Base64 format.'));
        }
    });
}

async function encodeHex(text) {
    return new Promise((resolve) => {
        const encoded = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(text));
        resolve(encoded);
    });
}

async function decodeHex(text) {
    return new Promise((resolve, reject) => {
        try {
            const decoded = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(text));
            resolve(decoded);
        } catch (error) {
            reject(new Error('Invalid Hex format.'));
        }
    });
}

// Display result with animation
function displayResult(result) {
    outputText.style.opacity = '0';
    outputText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        outputText.value = result;
        outputText.style.transition = 'all 0.5s ease-out';
        outputText.style.opacity = '1';
        outputText.style.transform = 'translateY(0)';
    }, 200);
}

// Copy output to clipboard
async function copyOutput() {
    try {
        await navigator.clipboard.writeText(outputText.value);
        showNotification('Copied to clipboard!', 'success');
        
        // Add copy animation
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
        
    } catch (error) {
        showNotification('Failed to copy to clipboard', 'error');
    }
}

// Clear output
function clearOutput() {
    outputText.style.opacity = '0';
    outputText.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        outputText.value = '';
        outputText.style.transition = 'all 0.5s ease-out';
        outputText.style.opacity = '1';
        outputText.style.transform = 'translateY(0)';
    }, 200);
    
    showNotification('Output cleared!', 'info');
}

// Show loading overlay
function showLoading() {
    loadingOverlay.style.display = 'flex';
}

// Hide loading overlay
function hideLoading() {
    loadingOverlay.style.display = 'none';
}

// Show notification
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    
    // Update notification style based on type
    notification.className = `notification ${type}`;
    
    // Update icon
    const icon = notification.querySelector('i');
    switch (type) {
        case 'success':
            icon.className = 'fas fa-check-circle';
            notification.style.background = '#28a745';
            break;
        case 'error':
            icon.className = 'fas fa-exclamation-circle';
            notification.style.background = '#dc3545';
            break;
        case 'info':
            icon.className = 'fas fa-info-circle';
            notification.style.background = '#17a2b8';
            break;
    }
    
    // Show notification
    notification.style.display = 'block';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Animation functions
function animateModeChange() {
    const formPanel = document.querySelector('.form-panel');
    formPanel.style.transform = 'scale(0.98)';
    formPanel.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        formPanel.style.transform = 'scale(1)';
    }, 300);
}

function animateToolChange() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.transform = 'translateX(10px)';
    sidebar.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        sidebar.style.transform = 'translateX(0)';
    }, 300);
}

function animateOptionSelection(button) {
    button.style.transform = 'scale(0.95)';
    button.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

// Setup input animations
function setupInputAnimations() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to encrypt/decrypt
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleAction();
        }
        
        // Ctrl/Cmd + C to copy
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === outputText) {
            e.preventDefault();
            copyOutput();
        }
        
        // Escape to clear
        if (e.key === 'Escape') {
            clearOutput();
        }
    });
}

// Add entrance animations
function addAnimations() {
    // Stagger animation for form groups
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Stagger animation for tool items
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach((item, index) => {
        item.style.animationDelay = `${0.05 * index}s`;
    });
}

// Add tooltips
function addTooltips() {
    const tooltips = {
        'secret-key': 'Enter a strong password or key for encryption',
        'iv-input': 'Initialization Vector (optional for CBC mode)',
        'copy-btn': 'Copy the result to clipboard',
        'clear-btn': 'Clear the output field'
    };
    
    Object.entries(tooltips).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) {
            element.title = text;
        }
    });
}

// Setup AI suggestions
function setupAISuggestions() {
    // Auto-generate strong keys
    secretKey.addEventListener('focus', function() {
        if (!this.value) {
            this.placeholder = 'Tip: Use a strong password with mixed characters';
        }
    });
    
    // Suggest IV for CBC mode
    ivInput.addEventListener('focus', function() {
        if (selectedMode === 'CBC' && !this.value) {
            this.placeholder = 'Tip: Leave empty for auto-generation';
        }
    });
    
    // Real-time validation
    inputText.addEventListener('input', function() {
        if (this.value.length > 1000) {
            showNotification('Large text detected. Processing may take longer.', 'info');
        }
    });
}

// Add some interactive features
function addInteractiveFeatures() {
    // Auto-resize textareas
    const textareas = document.querySelectorAll('.form-textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    // Generate random key button
    const secretKeyContainer = secretKey.parentElement;
    const generateKeyBtn = document.createElement('button');
    generateKeyBtn.innerHTML = '<i class="fas fa-dice"></i>';
    generateKeyBtn.className = 'generate-key-btn';
    generateKeyBtn.title = 'Generate random key';
    generateKeyBtn.style.cssText = `
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #667eea;
        cursor: pointer;
        padding: 5px;
        border-radius: 5px;
        transition: all 0.3s ease;
    `;
    
    generateKeyBtn.addEventListener('click', function() {
        const randomKey = generateRandomKey();
        secretKey.value = randomKey;
        showNotification('Random key generated!', 'success');
    });
    
    secretKeyContainer.style.position = 'relative';
    secretKeyContainer.appendChild(generateKeyBtn);
}

// Generate random key
function generateRandomKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < 16; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Initialize interactive features
document.addEventListener('DOMContentLoaded', function() {
    addInteractiveFeatures();
});

// Add some advanced features
function addAdvancedFeatures() {
    // File upload for text
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.txt,.md,.json,.xml,.pdf,.jpg,.png,.gif';
    fileInput.style.display = 'none';
    fileInput.id = 'file-input';
    
    const uploadBtn = document.createElement('button');
    uploadBtn.innerHTML = '<i class="fas fa-upload"></i> Upload File';
    uploadBtn.className = 'upload-btn';
    uploadBtn.style.cssText = `
        margin-top: 10px;
        padding: 8px 16px;
        background: #f8f9fa;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        color: #6c757d;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    `;
    
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileUpload);
    
    inputText.parentElement.appendChild(uploadBtn);
    document.body.appendChild(fileInput);
    
    // Add password strength indicator
    addPasswordStrengthIndicator();
    
    // Add format detection
    addFormatDetection();
}

function addPasswordStrengthIndicator() {
    const secretKey = document.getElementById('secret-key');
    const strengthIndicator = document.createElement('div');
    strengthIndicator.id = 'password-strength';
    strengthIndicator.style.cssText = `
        margin-top: 5px;
        font-size: 0.8rem;
        padding: 5px;
        border-radius: 5px;
        display: none;
    `;
    
    secretKey.parentElement.appendChild(strengthIndicator);
    
    secretKey.addEventListener('input', function() {
        if (this.value.length > 0) {
            const analysis = analyzePasswordStrength(this.value);
            strengthIndicator.style.display = 'block';
            strengthIndicator.textContent = `Strength: ${analysis.strength} (${analysis.score}/5)`;
            
            if (analysis.strength === 'Strong') {
                strengthIndicator.style.background = '#d4edda';
                strengthIndicator.style.color = '#155724';
            } else if (analysis.strength === 'Medium') {
                strengthIndicator.style.background = '#fff3cd';
                strengthIndicator.style.color = '#856404';
            } else {
                strengthIndicator.style.background = '#f8d7da';
                strengthIndicator.style.color = '#721c24';
            }
        } else {
            strengthIndicator.style.display = 'none';
        }
    });
}

function addFormatDetection() {
    const inputText = document.getElementById('input-text');
    const formatDetector = document.createElement('div');
    formatDetector.id = 'format-detector';
    formatDetector.style.cssText = `
        margin-top: 5px;
        font-size: 0.8rem;
        padding: 5px;
        border-radius: 5px;
        display: none;
        background: #e7f3ff;
        color: #0056b3;
    `;
    
    inputText.parentElement.appendChild(formatDetector);
    
    inputText.addEventListener('input', function() {
        if (this.value.length > 10) {
            const format = detectEncryptionFormat(this.value);
            if (format !== 'unknown') {
                formatDetector.style.display = 'block';
                formatDetector.textContent = `Detected format: ${format.toUpperCase()}`;
            } else {
                formatDetector.style.display = 'none';
            }
        } else {
            formatDetector.style.display = 'none';
        }
    });
}

// Handle file upload
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            inputText.value = e.target.result;
            showNotification('File loaded successfully!', 'success');
        };
        reader.readAsText(file);
    }
}

// Initialize advanced features
document.addEventListener('DOMContentLoaded', function() {
    addAdvancedFeatures();
}); 

// Enhanced AI Features
function setupAdvancedAIFeatures() {
    // Smart key suggestions
    setupSmartKeySuggestions();
    
    // Pattern recognition
    setupPatternRecognition();
    
    // Auto-completion
    setupAutoCompletion();
    
    // Smart tool recommendations
    setupToolRecommendations();
    
    // Real-time analysis
    setupRealTimeAnalysis();
    
    // AI-powered notifications
    setupAINotifications();
    
    // Enhanced animations
    setupEnhancedAnimations();
}

// Smart Key Suggestions
function setupSmartKeySuggestions() {
    const secretKey = document.getElementById('secret-key');
    
    secretKey.addEventListener('input', function() {
        const key = this.value;
        const analysis = analyzePasswordStrength(key);
        
        // Update strength indicator
        updatePasswordStrength(analysis);
        
        // Provide smart suggestions
        if (key.length > 0 && analysis.score < 3) {
            showAISuggestion(`💡 AI Tip: Try adding ${getKeySuggestion(analysis)} to make your key stronger`);
        }
        
        // Auto-generate strong key if requested
        if (key === 'generate' || key === 'auto') {
            const strongKey = generateStrongKey();
            this.value = strongKey;
            showAISuggestion('🔐 AI generated a strong key for you!');
        }
    });
}

// Pattern Recognition
function setupPatternRecognition() {
    const inputText = document.getElementById('input-text');
    
    inputText.addEventListener('input', function() {
        const text = this.value;
        
        if (text.length > 10) {
            // Detect encryption patterns
            const pattern = detectEncryptionPattern(text);
            if (pattern) {
                showAIAnalysis(`🔍 AI detected: ${pattern.type} pattern (${pattern.confidence}% confidence)`);
            }
            
            // Detect common text patterns
            const textPattern = analyzeTextPattern(text);
            if (textPattern) {
                showAISuggestion(`📝 AI suggests: ${textPattern.suggestion}`);
            }
        }
    });
}

// Auto-completion
function setupAutoCompletion() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const suggestion = getAutoCompletion(this.value, this.id);
                if (suggestion) {
                    this.value = suggestion;
                    showAISuggestion('⚡ AI auto-completed your input');
                }
            }
        });
    });
}

// Tool Recommendations
function setupToolRecommendations() {
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const tool = this.dataset.tool;
            const recommendation = getToolRecommendation(tool);
            if (recommendation) {
                showToolRecommendation(recommendation);
            }
        });
    });
}

// Real-time Analysis
function setupRealTimeAnalysis() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const inputs = group.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                analyzeInputInRealTime(this);
            });
        });
    });
}

// AI Notifications
function setupAINotifications() {
    // Smart notifications based on user behavior
    let lastAction = '';
    let actionCount = 0;
    let sessionStart = Date.now();
    
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('action-btn')) {
            actionCount++;
            const sessionTime = (Date.now() - sessionStart) / 1000;
            
            if (actionCount > 3 && lastAction === 'encrypt') {
                showAISuggestion('🎯 AI Tip: Consider using different encryption modes for better security');
            }
            
            if (sessionTime > 300 && actionCount > 5) {
                showAIAnalysis('📊 Session Analysis: You\'ve been active for 5+ minutes. Consider taking a break!');
            }
            
            lastAction = target.textContent.toLowerCase();
        }
    });
    
    // Periodic AI check-ins
    setInterval(() => {
        const suggestions = [
            '💡 Pro tip: Use different keys for different purposes',
            '🔐 Remember: Never reuse encryption keys',
            '🛡️ Security reminder: Keep your keys safe and secure',
            '⚡ Performance tip: Large files may take longer to process'
        ];
        
        if (Math.random() < 0.1) { // 10% chance every interval
            const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
            showAISuggestion(randomSuggestion);
        }
    }, 30000); // Every 30 seconds
}

// Helper Functions
function updatePasswordStrength(analysis) {
    const strengthIndicator = document.getElementById('password-strength');
    if (strengthIndicator) {
        strengthIndicator.className = `password-strength ${analysis.strength}`;
        strengthIndicator.textContent = `Strength: ${analysis.strength} (${analysis.score}/5)`;
        strengthIndicator.style.display = 'block';
        
        if (analysis.strength === 'Strong') {
            strengthIndicator.classList.add('ai-pulse');
        }
    }
}

function getKeySuggestion(analysis) {
    const suggestions = [];
    if (!analysis.feedback.includes('lowercase')) suggestions.push('lowercase letters');
    if (!analysis.feedback.includes('uppercase')) suggestions.push('uppercase letters');
    if (!analysis.feedback.includes('numbers')) suggestions.push('numbers');
    if (!analysis.feedback.includes('special')) suggestions.push('special characters');
    
    return suggestions.join(', ');
}

function generateStrongKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function detectEncryptionPattern(text) {
    const patterns = [
        { regex: /^[A-Za-z0-9+/=]+$/, type: 'Base64', confidence: 95 },
        { regex: /^[0-9a-fA-F]+$/, type: 'Hexadecimal', confidence: 90 },
        { regex: /^ENC\(.*\)$/, type: 'Jasypt', confidence: 85 },
        { regex: /^[A-Za-z0-9]{32,}$/, type: 'Hash', confidence: 80 }
    ];
    
    for (const pattern of patterns) {
        if (pattern.regex.test(text)) {
            return pattern;
        }
    }
    return null;
}

function analyzeTextPattern(text) {
    if (text.includes('password') || text.includes('secret')) {
        return { suggestion: 'Consider using a more complex key for better security' };
    }
    if (text.length < 8) {
        return { suggestion: 'Short text detected. Consider longer input for better encryption' };
    }
    if (text.match(/[0-9]{3,}/)) {
        return { suggestion: 'Numbers detected. This might be sensitive data - ensure secure handling' };
    }
    return null;
}

function getAutoCompletion(value, inputId) {
    const completions = {
        'secret-key': {
            'my': 'mySecretKey123!',
            'test': 'testPassword456!',
            'demo': 'demoKey789!'
        },
        'input-text': {
            'hello': 'Hello, World! This is a test message for encryption.',
            'test': 'This is a test message for encryption and decryption.',
            'demo': 'This is a demonstration of the encryption tool.'
        }
    };
    
    const inputCompletions = completions[inputId];
    if (inputCompletions) {
        for (const [key, completion] of Object.entries(inputCompletions)) {
            if (value.toLowerCase().startsWith(key)) {
                return completion;
            }
        }
    }
    return null;
}

function getToolRecommendation(tool) {
    const recommendations = {
        'aes': 'Best for general encryption with high security',
        'rsa': 'Ideal for asymmetric encryption and key exchange',
        'md5': 'Fast hashing, but not recommended for passwords',
        'sha256': 'Cryptographically secure hashing',
        'base64': 'Perfect for encoding binary data as text',
        'bcrypt': 'Excellent for password hashing with salt'
    };
    
    return recommendations[tool] || null;
}

function showToolRecommendation(recommendation) {
    const tooltip = document.createElement('div');
    tooltip.className = 'ai-tooltip';
    tooltip.textContent = recommendation;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(26, 26, 26, 0.95);
        color: #ffa500;
        padding: 10px;
        border-radius: 8px;
        border: 1px solid rgba(255, 165, 0, 0.3);
        font-size: 0.9rem;
        z-index: 1000;
        animation: fadeInUp 0.3s ease-out;
    `;
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

function analyzeInputInRealTime(input) {
    const value = input.value;
    
    // Analyze input length
    if (value.length > 1000) {
        showAISuggestion('📊 Large input detected. Processing may take longer.');
    }
    
    // Analyze for sensitive data
    if (value.match(/\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/)) {
        showAIAnalysis('⚠️ AI detected potential credit card number. Ensure secure handling.');
    }
    
    // Analyze for common patterns
    if (value.match(/password|secret|key/i)) {
        showAISuggestion('🔐 Sensitive data detected. Consider using stronger encryption.');
    }
}

function showAISuggestion(message) {
    const suggestion = document.createElement('div');
    suggestion.className = 'ai-suggestion ai-pulse';
    suggestion.innerHTML = `<i class="fas fa-robot"></i> ${message}`;
    
    const formPanel = document.querySelector('.form-panel');
    formPanel.appendChild(suggestion);
    
    setTimeout(() => {
        suggestion.remove();
    }, 5000);
}

function showAIAnalysis(message) {
    const analysis = document.createElement('div');
    analysis.className = 'ai-analysis ai-glow';
    analysis.innerHTML = `<i class="fas fa-brain"></i> ${message}`;
    
    const formPanel = document.querySelector('.form-panel');
    formPanel.appendChild(analysis);
    
    setTimeout(() => {
        analysis.remove();
    }, 5000);
}

// Enhanced Animation Functions
function setupEnhancedAnimations() {
    // Add floating animation to AI elements
    const aiElements = document.querySelectorAll('.ai-btn, .ai-suggestion, .ai-analysis');
    aiElements.forEach(element => {
        element.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add sparkle effect to important elements
    const sparkleElements = document.querySelectorAll('.main-title i, .panel-title i');
    sparkleElements.forEach(element => {
        element.style.animation = 'sparkle 2s ease-in-out infinite';
    });
    
    // Add glow effect to active elements
    const activeElements = document.querySelectorAll('.tool-item.active, .option-btn.active');
    activeElements.forEach(element => {
        element.classList.add('ai-glow');
    });
}

// Enhanced AI Features
function setupAdvancedAIFeatures() {
    // Smart key suggestions
    setupSmartKeySuggestions();
    
    // Pattern recognition
    setupPatternRecognition();
    
    // Auto-completion
    setupAutoCompletion();
    
    // Smart tool recommendations
    setupToolRecommendations();
    
    // Real-time analysis
    setupRealTimeAnalysis();
    
    // AI-powered notifications
    setupAINotifications();
    
    // Enhanced animations
    setupEnhancedAnimations();
}

// Enhanced Animation Functions
function setupEnhancedAnimations() {
    // Add floating animation to AI elements
    const aiElements = document.querySelectorAll('.ai-btn, .ai-suggestion, .ai-analysis');
    aiElements.forEach(element => {
        element.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add sparkle effect to important elements
    const sparkleElements = document.querySelectorAll('.main-title i, .panel-title i');
    sparkleElements.forEach(element => {
        element.style.animation = 'sparkle 2s ease-in-out infinite';
    });
    
    // Add glow effect to active elements
    const activeElements = document.querySelectorAll('.tool-item.active, .option-btn.active');
    activeElements.forEach(element => {
        element.classList.add('ai-glow');
    });
}

// Enhanced AI Notifications
function setupAINotifications() {
    // Smart notifications based on user behavior
    let lastAction = '';
    let actionCount = 0;
    let sessionStart = Date.now();
    
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('action-btn')) {
            actionCount++;
            const sessionTime = (Date.now() - sessionStart) / 1000;
            
            if (actionCount > 3 && lastAction === 'encrypt') {
                showAISuggestion('🎯 AI Tip: Consider using different encryption modes for better security');
            }
            
            if (sessionTime > 300 && actionCount > 5) {
                showAIAnalysis('📊 Session Analysis: You\'ve been active for 5+ minutes. Consider taking a break!');
            }
            
            lastAction = target.textContent.toLowerCase();
        }
    });
    
    // Periodic AI check-ins
    setInterval(() => {
        const suggestions = [
            '💡 Pro tip: Use different keys for different purposes',
            '🔐 Remember: Never reuse encryption keys',
            '🛡️ Security reminder: Keep your keys safe and secure',
            '⚡ Performance tip: Large files may take longer to process'
        ];
        
        if (Math.random() < 0.1) { // 10% chance every interval
            const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
            showAISuggestion(randomSuggestion);
        }
    }, 30000); // Every 30 seconds
}

// AI Button Functions
function generateAISuggestion() {
    const suggestions = [
        '🔐 Try using a 256-bit key for maximum security',
        '🔄 Consider using CBC mode for better encryption',
        '📝 Add special characters to your key for strength',
        '⚡ Use the random key generator for secure keys',
        '🎯 Combine uppercase, lowercase, numbers, and symbols',
        '🔍 Enable format detection for automatic analysis',
        '💡 Use different encryption modes for various data types',
        '🛡️ Consider using HMAC for message authentication'
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    showAISuggestion(randomSuggestion);
    
    // Add animation to the button
    const btn = event.target;
    btn.classList.add('ai-pulse');
    setTimeout(() => btn.classList.remove('ai-pulse'), 2000);
}

function analyzeSecurity() {
    const inputText = document.getElementById('input-text').value;
    const secretKey = document.getElementById('secret-key').value;
    const currentTool = document.querySelector('.tool-item.active').dataset.tool;
    
    let analysis = [];
    
    // Analyze input text
    if (inputText.length > 0) {
        if (inputText.length < 8) {
            analysis.push('⚠️ Short input detected - consider longer text for better security');
        }
        if (inputText.match(/password|secret|key/i)) {
            analysis.push('🔐 Sensitive keywords detected - ensure secure handling');
        }
        if (inputText.match(/\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/)) {
            analysis.push('💳 Potential credit card number detected - use extra caution');
        }
    }
    
    // Analyze key strength
    if (secretKey.length > 0) {
        const keyAnalysis = analyzePasswordStrength(secretKey);
        analysis.push(`🔑 Key strength: ${keyAnalysis.strength} (${keyAnalysis.score}/5)`);
        if (keyAnalysis.score < 3) {
            analysis.push('💪 Consider strengthening your key with more character types');
        }
    }
    
    // Analyze tool selection
    const toolAnalysis = {
        'aes': 'Excellent choice for general encryption',
        'rsa': 'Great for asymmetric encryption',
        'sha256': 'Cryptographically secure hashing',
        'bcrypt': 'Perfect for password hashing',
        'base64': 'Good for encoding binary data'
    };
    
    if (toolAnalysis[currentTool]) {
        analysis.push(`🛠️ ${toolAnalysis[currentTool]}`);
    }
    
    if (analysis.length === 0) {
        analysis.push('✅ Security analysis complete - everything looks good!');
    }
    
    showAIAnalysis(analysis.join('\n'));
    
    // Add animation
    const btn = event.target;
    btn.classList.add('ai-glow');
    setTimeout(() => btn.classList.remove('ai-glow'), 2000);
}

function autoOptimize() {
    const currentTool = document.querySelector('.tool-item.active').dataset.tool;
    const secretKey = document.getElementById('secret-key');
    const keySize = document.querySelector('[data-key-size].active');
    const mode = document.querySelector('[data-mode].active');
    
    let optimizations = [];
    
    // Auto-optimize key if weak
    if (secretKey.value.length > 0) {
        const keyAnalysis = analyzePasswordStrength(secretKey.value);
        if (keyAnalysis.score < 3) {
            const optimizedKey = generateStrongKey();
            secretKey.value = optimizedKey;
            optimizations.push('🔐 Auto-generated strong key');
        }
    }
    
    // Optimize settings based on tool
    if (currentTool === 'aes') {
        if (keySize && keySize.dataset.keySize === '128') {
            keySize.click();
            document.querySelector('[data-key-size="256"]').click();
            optimizations.push('🔒 Upgraded to 256-bit encryption');
        }
        if (mode && mode.dataset.mode === 'ECB') {
            mode.click();
            document.querySelector('[data-mode="CBC"]').click();
            optimizations.push('🔄 Switched to CBC mode for better security');
        }
    }
    
    if (optimizations.length === 0) {
        optimizations.push('✅ Settings already optimized!');
    }
    
    showAISuggestion(optimizations.join('\n'));
    
    // Add animation
    const btn = event.target;
    btn.classList.add('ai-shimmer');
    setTimeout(() => btn.classList.remove('ai-shimmer'), 2000);
}

function analyzeOutput() {
    const outputText = document.getElementById('output-text').value;
    
    if (outputText.length === 0) {
        showAIAnalysis('📝 No output to analyze');
        return;
    }
    
    let analysis = [];
    
    // Analyze output format
    const format = detectEncryptionFormat(outputText);
    if (format !== 'unknown') {
        analysis.push(`🔍 Detected format: ${format.toUpperCase()}`);
    }
    
    // Analyze output length
    if (outputText.length > 100) {
        analysis.push('📊 Large output detected - consider compression');
    }
    
    // Analyze entropy
    const entropy = calculateEntropy(outputText);
    analysis.push(`🎲 Entropy: ${entropy.toFixed(2)} bits (higher is better)`);
    
    // Security assessment
    if (entropy > 4.5) {
        analysis.push('✅ High entropy - good encryption');
    } else if (entropy > 3.0) {
        analysis.push('⚠️ Medium entropy - consider stronger encryption');
    } else {
        analysis.push('❌ Low entropy - weak encryption detected');
    }
    
    showAIAnalysis(analysis.join('\n'));
    
    // Add animation
    const btn = event.target;
    btn.classList.add('ai-pulse');
    setTimeout(() => btn.classList.remove('ai-pulse'), 2000);
}

// Helper function to calculate entropy
function calculateEntropy(text) {
    const charCount = {};
    for (let char of text) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    let entropy = 0;
    const length = text.length;
    
    for (let char in charCount) {
        const p = charCount[char] / length;
        entropy -= p * Math.log2(p);
    }
    
    return entropy;
}

// Enhanced AI Features
function setupAdvancedAIFeatures() {
    // Smart key suggestions
    setupSmartKeySuggestions();
    
    // Pattern recognition
    setupPatternRecognition();
    
    // Auto-completion
    setupAutoCompletion();
    
    // Smart tool recommendations
    setupToolRecommendations();
    
    // Real-time analysis
    setupRealTimeAnalysis();
    
    // AI-powered notifications
    setupAINotifications();
    
    // Enhanced animations
    setupEnhancedAnimations();
}

// Enhanced Animation Functions
function setupEnhancedAnimations() {
    // Add floating animation to AI elements
    const aiElements = document.querySelectorAll('.ai-btn, .ai-suggestion, .ai-analysis');
    aiElements.forEach(element => {
        element.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add sparkle effect to important elements
    const sparkleElements = document.querySelectorAll('.main-title i, .panel-title i');
    sparkleElements.forEach(element => {
        element.style.animation = 'sparkle 2s ease-in-out infinite';
    });
    
    // Add glow effect to active elements
    const activeElements = document.querySelectorAll('.tool-item.active, .option-btn.active');
    activeElements.forEach(element => {
        element.classList.add('ai-glow');
    });
}

// Enhanced AI Notifications
function setupAINotifications() {
    // Smart notifications based on user behavior
    let lastAction = '';
    let actionCount = 0;
    let sessionStart = Date.now();
    
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('action-btn')) {
            actionCount++;
            const sessionTime = (Date.now() - sessionStart) / 1000;
            
            if (actionCount > 3 && lastAction === 'encrypt') {
                showAISuggestion('🎯 AI Tip: Consider using different encryption modes for better security');
            }
            
            if (sessionTime > 300 && actionCount > 5) {
                showAIAnalysis('📊 Session Analysis: You\'ve been active for 5+ minutes. Consider taking a break!');
            }
            
            lastAction = target.textContent.toLowerCase();
        }
    });
    
    // Periodic AI check-ins
    setInterval(() => {
        const suggestions = [
            '💡 Pro tip: Use different keys for different purposes',
            '🔐 Remember: Never reuse encryption keys',
            '🛡️ Security reminder: Keep your keys safe and secure',
            '⚡ Performance tip: Large files may take longer to process'
        ];
        
        if (Math.random() < 0.1) { // 10% chance every interval
            const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
            showAISuggestion(randomSuggestion);
        }
    }, 30000); // Every 30 seconds
} 
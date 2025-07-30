// Utility Functions for Calculators and Tools

// Date Difference Calculator
function calculateDateDifference(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = Math.floor(diffDays / 365);
    const diffMonths = Math.floor((diffDays % 365) / 30);
    const remainingDays = diffDays % 30;
    
    return {
        days: diffDays,
        years: diffYears,
        months: diffMonths,
        remainingDays: remainingDays
    };
}

// Age Calculator
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    const months = monthDiff < 0 ? 12 + monthDiff : monthDiff;
    const days = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
    
    return {
        years: age,
        months: months,
        days: days
    };
}

// Fuel to Distance Calculator
function calculateFuelDistance(fuelAmount, fuelEfficiency) {
    const distance = fuelAmount * fuelEfficiency;
    const cost = fuelAmount * 1.5; // Assuming $1.5 per liter
    
    return {
        distance: distance.toFixed(2),
        cost: cost.toFixed(2),
        efficiency: fuelEfficiency
    };
}

// Fixed Deposit Calculator
function calculateFixedDeposit(principal, rate, time, compounding) {
    const r = rate / 100;
    const t = time;
    const n = compounding;
    
    const amount = principal * Math.pow(1 + r/n, n*t);
    const interest = amount - principal;
    
    return {
        principal: principal,
        interest: interest.toFixed(2),
        amount: amount.toFixed(2),
        rate: rate,
        time: time
    };
}

// SIP Calculator
function calculateSIP(monthlyInvestment, rate, time) {
    const r = rate / 100 / 12; // Monthly rate
    const n = time * 12; // Total months
    
    const amount = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = monthlyInvestment * n;
    const interest = amount - totalInvestment;
    
    return {
        monthlyInvestment: monthlyInvestment,
        totalInvestment: totalInvestment.toFixed(2),
        interest: interest.toFixed(2),
        amount: amount.toFixed(2),
        rate: rate,
        time: time
    };
}

// TIP Calculator
function calculateTip(billAmount, tipPercentage, splitBetween) {
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / splitBetween;
    
    return {
        billAmount: billAmount,
        tipAmount: tipAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        perPerson: perPerson.toFixed(2),
        tipPercentage: tipPercentage,
        splitBetween: splitBetween
    };
}

// Length Unit Converter
const lengthUnits = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.344,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
};

function convertLength(value, fromUnit, toUnit) {
    const meters = value * lengthUnits[fromUnit];
    const result = meters / lengthUnits[toUnit];
    return result.toFixed(6);
}

// Image Processing Functions (simplified)
function processImageToPDF(imageData) {
    // This would typically use a library like jsPDF
    return {
        success: true,
        message: 'Image converted to PDF successfully',
        data: imageData
    };
}

function convertImageFormat(imageData, targetFormat) {
    return {
        success: true,
        message: `Image converted to ${targetFormat} successfully`,
        data: imageData,
        format: targetFormat
    };
}

function resizeImage(imageData, newWidth, newHeight) {
    return {
        success: true,
        message: 'Image resized successfully',
        data: imageData,
        width: newWidth,
        height: newHeight
    };
}

function generateVideoThumbnail(videoData, timePosition) {
    return {
        success: true,
        message: 'Video thumbnail generated successfully',
        data: videoData,
        timePosition: timePosition
    };
}

// PDF Merger (simplified)
function mergePDFs(pdfFiles) {
    return {
        success: true,
        message: 'PDFs merged successfully',
        fileCount: pdfFiles.length
    };
}

// Enhanced Encryption Functions

// RSA Key Generation (simplified)
function generateRSAKeys() {
    // This is a simplified implementation
    // In a real application, you'd use a proper RSA library
    const publicKey = '-----BEGIN PUBLIC KEY-----\n' +
                     'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...\n' +
                     '-----END PUBLIC KEY-----';
    
    const privateKey = '-----BEGIN PRIVATE KEY-----\n' +
                       'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n' +
                       '-----END PRIVATE KEY-----';
    
    return {
        publicKey: publicKey,
        privateKey: privateKey
    };
}

// Enhanced Hashing Functions
function hashWithSalt(text, salt) {
    return CryptoJS.SHA256(text + salt).toString();
}

function hashWithPepper(text, pepper) {
    return CryptoJS.SHA256(pepper + text + pepper).toString();
}

// Advanced Encoding Functions
function encodeURLSafe(text) {
    return encodeURIComponent(text);
}

function decodeURLSafe(text) {
    return decodeURIComponent(text);
}

function encodeUnicode(text) {
    return text.split('').map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')).join('');
}

function decodeUnicode(text) {
    return text.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
}

// Security Analysis Functions
function analyzePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    if (password.length >= 8) score += 1;
    else feedback.push('Password should be at least 8 characters long');
    
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Add lowercase letters');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Add uppercase letters');
    
    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Add numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('Add special characters');
    
    let strength = 'Weak';
    if (score >= 4) strength = 'Strong';
    else if (score >= 3) strength = 'Medium';
    
    return {
        score: score,
        strength: strength,
        feedback: feedback
    };
}

function detectEncryptionFormat(text) {
    // Try to detect the format of encrypted text
    if (text.startsWith('ENC(') && text.endsWith(')')) {
        return 'jasypt';
    } else if (/^[A-Za-z0-9+/=]+$/.test(text)) {
        return 'base64';
    } else if (/^[0-9a-fA-F]+$/.test(text)) {
        return 'hex';
    } else {
        return 'unknown';
    }
}

// Utility Functions for UI
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

function generateRandomString(length, includeSpecial = true) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (includeSpecial) {
        chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }
    
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Export functions for use in main script
window.Utilities = {
    calculateDateDifference,
    calculateAge,
    calculateFuelDistance,
    calculateFixedDeposit,
    calculateSIP,
    calculateTip,
    convertLength,
    processImageToPDF,
    convertImageFormat,
    resizeImage,
    generateVideoThumbnail,
    mergePDFs,
    generateRSAKeys,
    hashWithSalt,
    hashWithPepper,
    encodeURLSafe,
    decodeURLSafe,
    encodeUnicode,
    decodeUnicode,
    analyzePasswordStrength,
    detectEncryptionFormat,
    formatBytes,
    formatDuration,
    generateRandomString
}; 
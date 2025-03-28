/**
 * 加密工具 - 实现密码加盐哈希
 */
import CryptoJS from 'crypto-js'

/**
 * 生成随机盐值
 * @param {number} length 盐值长度，默认16
 * @returns {string} 生成的随机盐值
 */
export function generateSalt(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let salt = '';
    for (let i = 0; i < length; i++) {
        salt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return salt;
}

/**
 * 使用SHA256对密码进行哈希处理
 * @param {string} password 原始密码
 * @param {string} salt 盐值
 * @returns {string} 哈希后的密码
 */
export function hashPassword(password, salt) {
    // 第一次哈希 - 纯密码
    const firstHash = CryptoJS.SHA256(password).toString();

    // 第二次哈希 - 加盐
    const secondHash = CryptoJS.SHA256(firstHash + salt).toString();

    return secondHash;
}

/**
 * 完整的密码加密流程，返回加密后的密码和使用的盐值
 * @param {string} password 原始密码
 * @returns {Object} 包含加密后密码和盐值的对象
 */
export function encryptPassword(password) {
    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    return {
        password: hashedPassword,
        salt: salt
    };
} 
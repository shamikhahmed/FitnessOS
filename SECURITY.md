# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅        |

## Reporting a Vulnerability

If you discover a security vulnerability in FitnessOS, please report it privately:

**Email:** shamikh73@gmail.com  
**Subject:** `[SECURITY] FitnessOS — <brief description>`

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

**Do not** open a public GitHub issue for security vulnerabilities.

## Security Notes

- FitnessOS is a client-side-only PWA — all data is stored in `localStorage`
- No backend, no server, no network requests for user data
- No authentication tokens, passwords, or sensitive credentials are stored
- All user-supplied data is escaped before insertion into the DOM

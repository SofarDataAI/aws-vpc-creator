/**
 * This function parses an environment variable and returns its value.
 * @param envVarName string
 * @param defaultValue T
 * @returns T
 */
export function parseEnvVariable<T>(envVarName: string, defaultValue: T): T {
    if (process.env[envVarName]) {
        return process.env[envVarName] as unknown as T;
    }
    return defaultValue;
}

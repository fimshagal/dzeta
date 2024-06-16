export const createMemyTriggersKey = (triggers: any[]): string => {
    return triggers
        .map(item => JSON.stringify(item))
        .join("_");
};
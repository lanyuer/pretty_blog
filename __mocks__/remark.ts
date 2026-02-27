// Mock for remark
export function remark() {
  return {
    use: () => remark(),
    process: async (content: string) => ({
      toString: () => `<html>${content}</html>`,
    }),
  };
}

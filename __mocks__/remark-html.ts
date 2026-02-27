// Mock for remark-html
export default function html() {
  return {
    process: async (content: string) => ({
      toString: () => `<html>${content}</html>`,
    }),
  };
}

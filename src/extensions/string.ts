declare global {
  interface String {
    removingHTMLOccurances(): string;
  }
}

String.prototype.removingHTMLOccurances = function (): string {
  return this.replace(/<[^>]+>/g, "");
};

export {};

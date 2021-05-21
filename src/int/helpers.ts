declare global {
  interface String {
    // Capitalize method.
    c(): string
  }
}

export function augmentGlobals(): void {
  // Capitalize method.
  String.prototype.c = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }
}

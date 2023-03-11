class helpers {
  isUndefined = (value: unknown): value is undefined => {
    return typeof value === "undefined";
  };
}

export default new helpers();

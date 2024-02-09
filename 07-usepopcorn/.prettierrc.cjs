module.exports = {
  semi: true,
  singleQuote: false,
  trailingComma: "none", // Change this line to disable trailing commas
  printWidth: 75,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  overrides: [
    {
      files: "*.js",
      options: {
        tabWidth: 5,
        trailingComma: "none" // Change this line to disable trailing commas
      }
    },
    {
      files: "*.jsx",
      options: {
        tabWidth: 3,
        trailingComma: "none" // Change this line to disable trailing commas
      }
    },
    {
      files: ["*.html", "*.css"],
      options: {
        tabWidth: 2,
        trailingComma: "none" // Change this line to disable trailing commas
      }
    },
    {
      files: "*.json",
      options: {
        printWidth: 80,
        singleQuote: false,
        trailingComma: "none", // Change this line to disable trailing commas
        bracketSpacing: false
      }
    }
  ]
};

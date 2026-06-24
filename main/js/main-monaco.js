let meuEditor;
(require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs",
  },
}),
  require(["vs/editor/editor.main"], function () {
    fetch(
      "https://raw.githubusercontent.com/brijeshb42/monaco-themes/master/themes/Dracula.json",
    )
      .then((e) => e.json())
      .then((e) => {
        ((e.colors["editor.background"] = "#0e0f12"),
          monaco.editor.defineTheme("dracula", e),
          (meuEditor = monaco.editor.create(document.getElementById("editor"), {
            value:
              "const x = 10; \nconst y = 20;\nconst addition = x + y\n\nfunction xy() {\n console.log(addition)\n}\nxy();",
            language: "javascript",
            theme: "dracula",
            automaticLayout: !0,
            fontFamily: '"Geist Mono", "Fira Code", Consolas, monospace',
            fontLigatures: !0,
            minimap: { enabled: !1 },
          })));
      });
  }));

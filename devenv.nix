{pkgs, ...}: {
  languages = {
    javascript = {
      enable = true;
      pnpm = {
        enable = true;
        install.enable = true;
      };
    };
  };

  packages = with pkgs; [
    tailwindcss-language-server
    tinymist
    nixfmt
  ];
}

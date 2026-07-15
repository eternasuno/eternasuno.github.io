{pkgs, ...}: {
  languages = {
    deno.enable = true;
    typst.enable = true;
  };

  packages = with pkgs;[ tailwindcss-language-server ];

  env.LD_LIBRARY_PATH = "${pkgs.stdenv.cc.cc.lib}/lib";
}

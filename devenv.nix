{ pkgs, lib, ... }:
let
  path = lib.makeLibraryPath [ pkgs.stdenv.cc.cc.lib ];
  deno = pkgs.symlinkJoin {
    name = "deno";
    paths = [ pkgs.deno ];
    buildInputs = [ pkgs.makeWrapper ];
    postBuild = ''
      wrapProgram $out/bin/deno --prefix LD_LIBRARY_PATH : ${path}
    '';
  };
in
{
  languages = {
    deno = {
      enable = true;
      package = deno;
    };
    typst.enable = true;
  };

  packages = with pkgs; [
    tailwindcss-language-server
    nixfmt
  ];
}

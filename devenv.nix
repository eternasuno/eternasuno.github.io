{pkgs, ...}: {
  languages = {
    deno.enable = true;
    typst.enable = true;
  };

  env.LD_LIBRARY_PATH = "${pkgs.stdenv.cc.cc.lib}/lib";
}

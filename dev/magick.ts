const affineTransformGenerator: Fig.Generator = {
  script: function (context) {
    return `echo ${context[context.length - 1]}`;
  },
  postProcess: function (transform) {
    const transforms = [
      { name: "sx", description: "scale x" },
      { name: "rx", description: "shear x" },
      { name: "ry", description: "shear y" },
      { name: "sy", description: "scale y" },
      { name: "tx", description: "translate x in pixels (optional)" },
      { name: "ty", description: "translate y in pixels (optional)" },
    ];
    const i = transform.split(",").filter((d) => d).length;
    const { name, description } = transforms[i];
    return [{ name, description }];
  },
  trigger: ",",
  getQueryTerm: ",",
};

const completionSpec: Fig.Spec = {
  name: "magick",
  description: "",
  parserDirectives: {
    flagsArePosixNoncompliant: true,
  },
  subcommands: [
    {
      name: "convert",
      args: [{ name: "Input Image", isVariadic: true, template: "filepaths" }],
      options: [
        {
          name: "-adaptive-blur",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-adaptive-resize",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-adaptive-sharpen",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-adjoin",
          description:
            "join images into a single multi-image file (enabled by default).",
        },
        {
          name: "+adjoin",
          description: "join images into a seperate signle-image files.",
        },
        {
          name: "-affine",

          description:
            "set the drawing transformation matrix for combined rotating and scaling.",
          args: {
            name: "transformation",
            generators: affineTransformGenerator,
          },
        },
        {
          name: "-alpha",

          description: "control the alpha/matte channel of an image.",
          args: {
            name: "alpha mode",
            suggestions: [
              {
                name: "activate",
                description: "enable the transparency channel.",
              },
              {
                name: "associate",
                description: "associate the alpha channel with this image.",
              },
              {
                name: "deactivate",
                description: "disable the transparency channel.",
              },
              {
                name: "disassociate",
                description: "disassociate the alpha channel with this image.",
              },
              {
                name: "set",
                description:
                  "activate the alpha/matte channel and resets to opaque if it was previously off.",
              },
              {
                name: "opaque",
                description:
                  "enable the alpha/matte channel and forces it to be fully opaque.",
              },
              {
                name: "transparent",
                description:
                  "enable the alpha/matte channel and forces it to be fully transparent.",
              },
              {
                name: "extract",
                description:
                  "copy the alpha into all color channels and turn off the alpha channel.",
              },
              {
                name: "copy",
                description:
                  "turn on the alpha channel and copy the greyscale version of the image into it.",
              },
              {
                name: "shape",
                description: "same as copy but replace rgb with alpha shape.",
              },
              {
                name: "remove",
                description: "composite the image over the background color.",
              },
              {
                name: "remove",
                description:
                  "set any fully transparent pixel to the background color.",
              },
            ],
          },
        },
        {
          name: "-antialias",
          description:
            "enable/disable anti-aliasing pixels when drawing fonts and lines.",
        },
        {
          name: "+antialias",
          description: "disable additional of anti-aliasing edge pixels.",
        },
        { name: "-append", description: "join current images vertically." },
        { name: "+append", description: "join current images horizontall." },
        {
          name: "-attenuate",
          description: "lessen (or intensify) when adding noise to an image.",
          args: {
            name: "value",
            description:
              "if unset the value is equivalent to 1.0, or a maximum noise addition",
          },
        },
        {
          name: "-authenticate",
          description: "decrypt a PDF with a password.",
          args: {
            name: "password",
            description:
              "a password for decrypting a PDF that has been encrypted using Microsoft Crypto API (MSC API).",
          },
        },
        {
          name: "-auto-gamma",
          description: "automatically adjust the gamma level.",
        },
        {
          name: "-auto-level",
          description: "automatically adjust the color levels.",
        },
        {
          name: "-auto-orient",
          description:
            "adjusts an image so that its orientation is suitable for viewing (i.e. top-left orientation).",
        },
        {
          name: "-auto-threshold",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-average",
          description: "",
        },
        {
          name: "-backdrop",
          description: "",
        },
        {
          name: "-background",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-bench",
          description: "",
          args: { name: "iterations", description: "" },
        },
        {
          name: "-bias",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-bilateral-blur",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-black-point-compensation",
          description: "",
        },
        {
          name: "-black-threshold",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-blend",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-blue-primary",
          description: "",
          args: { name: "x", description: "" },
        },
        {
          name: "-blue-shift",
          description: "",
          args: { name: "factor", description: "" },
        },
        {
          name: "-blur",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-border",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-bordercolor",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-borderwidth",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-brightness-contrast",
          description: "",
          args: { name: "brightness", description: "" },
        },
        {
          name: "-cache",
          description: "",
          args: { name: "threshold", description: "" },
        },
        {
          name: "-canny",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-caption",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-cdl",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-channel",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-channel-fx",
          description: "",
          args: { name: "expression", description: "" },
        },
        {
          name: "-charcoal",
          description: "",
          args: { name: "factor", description: "" },
        },
        {
          name: "-chop",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-clahe",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-clamp",
          description: "",
        },
        { name: "-clip", description: "" },
        {
          name: "-clip-mask",
          description: "",
        },
        {
          name: "-clip-path",
          description: "",
          args: { name: "id", description: "" },
        },
        {
          name: "-clone",
          description: "",
          args: { name: "index(s)", description: "" },
        },
        { name: "-clut", description: "" },
        {
          name: "-coalesce",
          description: "",
        },
        {
          name: "-colorize",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-colormap",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-colors",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-color-matrix",
          description: "",
          args: { name: "matrix", description: "" },
        },
        {
          name: "-colorspace",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-color-threshold",
          description: "",
          args: { name: "start-color", description: "" },
        },
        {
          name: "-combine",
          description: "",
        },
        {
          name: "-comment",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-compare",
          description: "",
        },
        {
          name: "-complex",
          description: "",
          args: { name: "operator", description: "" },
        },
        {
          name: "-compose",
          description: "",
          args: { name: "operator", description: "" },
        },
        {
          name: "-composite",
          description: "",
        },
        {
          name: "-compress",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-connected-components",
          description: "",
          args: { name: "connectivity", description: "" },
        },
        {
          name: "-contrast",
          description: "",
        },
        {
          name: "-contrast-stretch",
          description: "",
          args: { name: "black-point", description: "" },
        },
        {
          name: "-convolve",
          description: "",
          args: { name: "kernel", description: "" },
        },
        {
          name: "-copy",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-crop",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-cycle",
          description: "",
          args: { name: "amount", description: "" },
        },
        {
          name: "-debug",
          description: "",
          args: { name: "events", description: "" },
        },
        {
          name: "-decipher",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-deconstruct",
          description: "",
        },
        {
          name: "-define",
          description: "",
          args: { name: "key", description: "" },
        },
        {
          name: "-delay",
          description: "",
          args: { name: "ticks", description: "" },
        },
        {
          name: "-delete",
          description: "",
          args: { name: "indexes", description: "" },
        },
        {
          name: "-density",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-depth",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-descend",
          description: "",
        },
        {
          name: "-deskew",
          description: "",
          args: { name: "threshold{%}", description: "" },
        },
        {
          name: "-despeckle",
          description: "",
        },
        {
          name: "-direction",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-displace",
          description: "",
          args: { name: "horizontal-scale", description: "" },
        },
        {
          name: "-display",
          description: "",
          args: { name: "host:display[.screen]", description: "" },
        },
        {
          name: "-dispose",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-dissimilarity-threshold",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-dissolve",
          description: "",
          args: { name: "src_percent", description: "" },
        },
        {
          name: "-distort",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-distribute-cache",
          description: "",
          args: { name: "port", description: "" },
        },
        {
          name: "-dither",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-draw",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-duplicate",
          description: "",
          args: { name: "count,indexes", description: "" },
        },
        {
          name: "-edge",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-emboss",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-encipher",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-encoding",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-endian",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-enhance",
          description: "",
        },
        {
          name: "-equalize",
          description: "",
        },
        {
          name: "-evaluate",
          description: "",
          args: { name: "operator", description: "" },
        },
        {
          name: "-evaluate-sequence",
          description: "",
          args: { name: "operator", description: "" },
        },
        {
          name: "-extent",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-extract",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-family",
          description: "",
          args: { name: "fontFamily", description: "" },
        },
        {
          name: "-features",
          description: "",
          args: { name: "distance", description: "" },
        },
        { name: "-fft", description: "" },
        {
          name: "-fill",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-filter",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-flatten",
          description: "",
        },
        { name: "-flip", description: "" },
        {
          name: "-floodfill",
          description: "",
          args: { name: "{", description: "" },
        },
        { name: "-flop", description: "" },
        {
          name: "-font",
          description: "",
          args: { name: "name", description: "" },
        },
        {
          name: "-foreground",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-format",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-frame",
          description: "",
        },
        {
          name: "-function",
          description: "",
          args: { name: "function", description: "" },
        },
        {
          name: "-fuzz",
          description: "",
          args: { name: "distance", description: "" },
        },
        {
          name: "-fx",
          description: "",
          args: { name: "expression", description: "" },
        },
        {
          name: "-gamma",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-gaussian-blur",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-geometry",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-gravity",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-grayscale",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-green-primary",
          description: "",
          args: { name: "x,y", description: "" },
        },
        {
          name: "-hald-clut",
          description: "",
        },
        { name: "-help", description: "" },
        {
          name: "-highlight-color",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-hough-lines",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-iconGeometry",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-iconic",
          description: "",
        },
        {
          name: "-identify",
          description: "",
        },
        { name: "-ift", description: "" },
        {
          name: "-illuminant",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-immutable",
          description: "",
        },
        {
          name: "-implode",
          description: "",
          args: { name: "factor", description: "" },
        },
        {
          name: "-insert",
          description: "",
          args: { name: "index", description: "" },
        },
        {
          name: "-intensity",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-intent",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-interlace",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-interline-spacing",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-interpolate",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-interpolative-resize",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-interword-spacing",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-kerning",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-kmeans",
          description: "",
          args: { name: "colors", description: "" },
        },
        {
          name: "-kuwahara",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-label",
          description: "",
          args: { name: "name", description: "" },
        },
        {
          name: "-lat",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-layers",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-level",
          description: "",
          args: { name: "black_point", description: "" },
        },
        {
          name: "-level-colors",
          description: "",
          args: { name: "{", description: "" },
        },
        {
          name: "-limit",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-linear-stretch",
          description: "",
          args: { name: "black-point", description: "" },
        },
        {
          name: "-linewidth",
          description: "",
        },
        {
          name: "-liquid-rescale",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-list",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-log",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-loop",
          description: "",
          args: { name: "iterations", description: "" },
        },
        {
          name: "-lowlight-color",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-magnify",
          description: "",
        },
        {
          name: "-map",
          description: "",
          args: { name: "components", description: "" },
        },
        {
          name: "-mattecolor",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-maximum",
          description: "",
        },
        {
          name: "-median",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-mean-shift",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-metric",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-minimum",
          description: "",
        },
        {
          name: "-mode",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-modulate",
          description: "",
          args: { name: "brightness", description: "" },
        },
        {
          name: "-moments",
          description: "",
        },
        {
          name: "-monitor",
          description: "",
        },
        {
          name: "-monochrome",
          description: "",
        },
        {
          name: "-morph",
          description: "",
          args: { name: "frames", description: "" },
        },
        {
          name: "-morphology",
          description: "",
        },
        {
          name: "kernel",
          description: "",
        },
        {
          name: "-mosaic",
          description: "",
        },
        {
          name: "-motion-blur",
          description: "",
          args: { name: "radius", description: "" },
        },
        { name: "-name", description: "" },
        {
          name: "-negate",
          description: "",
        },
        {
          name: "-noise",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-normalize",
          description: "",
        },
        {
          name: "-opaque",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-ordered-dither",
          description: "",
          args: { name: "threshold_map", description: "" },
        },
        {
          name: "-orient",
          description: "",
          args: { name: "image", description: "" },
        },
        {
          name: "-page",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-paint",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-path",
          description: "",
          args: { name: "path", description: "" },
        },
        {
          name: "-pause",
          description: "",
          args: { name: "seconds", description: "" },
        },
        {
          name: "-perceptible",
          description: "",
          args: { name: "epsilon", description: "" },
        },
        { name: "-ping", description: "" },
        {
          name: "-pointsize",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-polaroid",
          description: "",
          args: { name: "angle", description: "" },
        },

        {
          name: "-poly",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-posterize",
          description: "",
          args: { name: "levels", description: "" },
        },
        {
          name: "-precision",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-preview",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-print",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-process",
          description: "",
          args: { name: "command", description: "" },
        },
        {
          name: "-profile",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-quality",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-quantize",
          description: "",
          args: { name: "colorspace", description: "" },
        },
        {
          name: "-quiet",
          description: "",
        },
        {
          name: "-radial-blur",
          description: "",
          args: { name: "angle", description: "" },
        },
        {
          name: "-raise",
          description: "",
          args: { name: "thickness", description: "" },
        },
        {
          name: "-random-threshold",
          description: "",
          args: { name: "low", description: "" },
        },
        {
          name: "-range-threshold",
          description: "",
          args: { name: "low-black", description: "" },
        },
        {
          name: "-read-mask",
          description: "",
        },
        {
          name: "-red-primary",
          description: "",
          args: { name: "x,y", description: "" },
        },
        {
          name: "-regard-warnings",
          description: "",
        },
        {
          name: "-remap",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-region",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-remote",
          description: "",
        },
        {
          name: "-render",
          description: "",
        },
        {
          name: "-repage",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-resample",
          description: "",
          args: { name: "horizontal", description: "" },
        },
        {
          name: "-resize",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-respect-parentheses",
          description: "",
        },
        {
          name: "-reverse",
          description: "",
        },
        {
          name: "-roll",
          description: "",
          args: { name: "{", description: "" },
        },
        {
          name: "-rotate",
          description: "",
          args: { name: "degrees", description: "" },
        },
        {
          name: "-sample",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-sampling-factor",
          description: "",
          args: { name: "horizontal-factor", description: "" },
        },
        {
          name: "-scale",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-scene",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-screen",
          description: "",
        },
        { name: "-seed", description: "" },
        {
          name: "-segment",
          description: "",
          args: { name: "cluster-threshold", description: "" },
        },
        {
          name: "-selective-blur",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-separate",
          description: "",
        },
        {
          name: "-sepia-tone",
          description: "",
          args: { name: "percent-threshold", description: "" },
        },
        {
          name: "-set",
          description: "",
          args: { name: "key", description: "" },
        },
        {
          name: "-shade",
          description: "",
          args: { name: "azimuth", description: "" },
        },
        {
          name: "-shadow",
          description: "",
          args: { name: "percent-opacity", description: "" },
        },
        {
          name: "-sharpen",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-shave",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-shear",
          description: "",
          args: { name: "Xdegrees", description: "" },
        },
        {
          name: "-sigmoidal-contrast",
          description: "",
          args: { name: "contrast", description: "" },
        },
        {
          name: "-silent",
          description: "",
        },
        {
          name: "-similarity-threshold",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-size",
          description: "",
          args: { name: "width", description: "" },
        },
        {
          name: "-sketch",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-smush",
          description: "",
          args: { name: "offset", description: "" },
        },
        {
          name: "-snaps",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-solarize",
          description: "",
          args: { name: "percent-threshold", description: "" },
        },
        {
          name: "-sort-pixels",
          description: "",
        },
        {
          name: "-sparse-color",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-splice",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-spread",
          description: "",
          args: { name: "amount", description: "" },
        },
        {
          name: "-statistic",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-stegano",
          description: "",
          args: { name: "offset", description: "" },
        },
        {
          name: "-stereo",
          description: "",
          args: { name: "+x", description: "" },
        },
        {
          name: "-storage-type",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-stretch",
          description: "",
          args: { name: "fontStretch", description: "" },
        },
        {
          name: "-strip",
          description: "",
        },
        {
          name: "-stroke",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-strokewidth",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-style",
          description: "",
          args: { name: "fontStyle", description: "" },
        },
        {
          name: "-subimage-search",
          description: "",
        },
        {
          name: "-swap",
          description: "",
          args: { name: "index,index", description: "" },
        },
        {
          name: "-swirl",
          description: "",
          args: { name: "degrees", description: "" },
        },
        {
          name: "-synchronize",
          description: "",
        },
        {
          name: "-taint",
          description: "",
        },
        {
          name: "-text-font",
          description: "",
          args: { name: "name", description: "" },
        },
        {
          name: "-texture",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-threshold",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-thumbnail",
          description: "",
          args: { name: "geometry", description: "" },
        },
        {
          name: "-tile",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-tile-offset",
          description: "",
          args: { name: "{", description: "" },
        },
        {
          name: "-tint",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-title",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-transform",
          description: "",
        },
        {
          name: "-transparent",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-transparent-color",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-transpose",
          description: "",
        },
        {
          name: "-transverse",
          description: "",
        },
        {
          name: "-treedepth",
          description: "",
          args: { name: "value", description: "" },
        },
        { name: "-trim", description: "" },
        {
          name: "-type",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-undercolor",
          description: "",
          args: { name: "color", description: "" },
        },
        {
          name: "-update",
          description: "",
          args: { name: "seconds", description: "" },
        },
        {
          name: "-unique-colors",
          description: "",
        },
        {
          name: "-units",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-unsharp",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-verbose",
          description: "",
        },
        {
          name: "-version",
          description: "",
        },
        {
          name: "-view",
          description: "",
          args: { name: "string", description: "" },
        },
        {
          name: "-vignette",
          description: "",
          args: { name: "radius", description: "" },
        },
        {
          name: "-virtual-pixel",
          description: "",
          args: { name: "method", description: "" },
        },
        {
          name: "-visual",
          description: "",
          args: { name: "type", description: "" },
        },
        {
          name: "-watermark",
          description: "",
          args: { name: "brightness", description: "" },
        },
        {
          name: "-wave",
          description: "",
          args: { name: "amplitude", description: "" },
        },
        {
          name: "-wavelet-denoise",
          description: "",
          args: { name: "threshold", description: "" },
        },
        {
          name: "-weight",
          description: "",
          args: { name: "fontWeight", description: "" },
        },
        {
          name: "-white-balance",
          description: "",
        },
        {
          name: "-white-point",
          description: "",
          args: { name: "x,y", description: "" },
        },
        {
          name: "-white-threshold",
          description: "",
          args: { name: "value", description: "" },
        },
        {
          name: "-window",
          description: "",
          args: { name: "id", description: "" },
        },
        {
          name: "-window-group",
          description: "",
        },
        {
          name: "-write",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
        {
          name: "-write-mask",
          description: "",
          args: { name: "filename", template: "filepaths" },
        },
      ],
    },
  ],

  // Only uncomment if magick takes an argument
  // args: {}
};

export default completionSpec;
